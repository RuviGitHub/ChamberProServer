import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import jwtConfig from '../config/jwt.config';

@Module({
  imports: [
    NestJwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
