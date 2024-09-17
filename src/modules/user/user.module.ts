import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { OtpService } from 'src/utils/otp.service';
import { MailService } from 'src/utils/mail.service';
import { ResponseService } from 'src/utils/response.service';
import { JwtModule } from 'src/auth/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),JwtModule],
  controllers: [UserController],
  providers: [UserService, OtpService, MailService, ResponseService],
  exports:[TypeOrmModule]
})
export class UserModule {}
