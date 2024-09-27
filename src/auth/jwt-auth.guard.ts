import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      // Check if the error is due to an invalid token or expired token
      if (info instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired.');
      } else if (info instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token.');
      }
      throw err || new UnauthorizedException('Unauthorized access.');
    }
    return user;
  }
}
