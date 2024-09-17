import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/entity/client.entity';
import { ResponseService } from 'src/utils/response.service';
import { JwtModule } from 'src/auth/jwt.module';
import { UserService } from '../user/user.service';
import { JwtService } from 'src/auth/jwt.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), JwtModule, UserModule],
  controllers: [ClientController],
  providers: [ClientService, ResponseService],
  exports: [TypeOrmModule],
})
export class ClientModule {}
