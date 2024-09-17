import { Module } from '@nestjs/common';
import { PoliceController } from './police.controller';
import { PoliceService } from './police.service';
import { ResponseService } from 'src/utils/response.service';
import { Police } from 'src/entity/police.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Police])],
  controllers: [PoliceController],
  providers: [PoliceService, ResponseService],
  exports: [TypeOrmModule]
})
export class PoliceModule {}
