import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  sign(payload: { user_id: number;  }) {
    return this.jwtService.sign(payload, {
      secret: jwtConfig.secret,
      expiresIn: jwtConfig.expiresIn,
    });
  }

  verify(token: string) {
    return this.jwtService.verify(token, { secret: jwtConfig.secret });
  }
}
