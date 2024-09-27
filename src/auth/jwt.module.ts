import { forwardRef, Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import jwtConfig from '../config/jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../modules/user/user.module'; // Adjust the import path as needed

@Module({
  imports: [
    NestJwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    PassportModule,
    forwardRef(() => UserModule),
  ],
  providers: [JwtService, JwtStrategy, RolesGuard],
  exports: [JwtService],
})
export class JwtModule {}
