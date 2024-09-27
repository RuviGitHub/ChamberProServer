import { Module } from '@nestjs/common';
import { ChamberController } from './chamber.controller';
import { ChamberService } from './chamber.service';
import { Chamber } from 'src/entity/chamber.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from 'src/utils/response.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chamber]), UserModule],
  controllers: [ChamberController],
  providers: [ChamberService, ResponseService],
  exports: [TypeOrmModule]
})
export class ChamberModule {}
