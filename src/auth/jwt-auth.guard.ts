import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "./jwt.service";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided.');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format.');
    }

    try {
      const decoded = this.jwtService.verify(token);
      const userId = decoded.user_id;

      // Validate token in the database
      const isTokenValid = await this.userService.validateToken(userId, token);

      if (!isTokenValid) {
        throw new UnauthorizedException('Invalid or expired token.');
      }

      request.user = { userId, name: decoded.name };

      // Optionally reset token expiration time if needed
      await this.userService.resetTokenExpiration(userId, token);

      return true;
    } catch (error) {
      console.error('Error in AuthGuard:', error);
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
