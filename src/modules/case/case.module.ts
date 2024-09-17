import { Module } from '@nestjs/common';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';
import { Case } from 'src/entity/case.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from 'src/utils/response.service';

@Module({
  imports: [TypeOrmModule.forFeature([Case])],
  controllers: [CaseController],
  providers: [CaseService, ResponseService],
  exports: [TypeOrmModule]
})
export class CaseModule {}
