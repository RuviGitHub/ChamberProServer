import { Module } from '@nestjs/common';
import { ComplexController } from './complex.controller';
import { ComplexService } from './complex.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complex } from 'src/entity/complex.entity';
import { ResponseService } from 'src/utils/response.service';

@Module({
  imports: [TypeOrmModule.forFeature([Complex])],
  controllers: [ComplexController],
  providers: [ComplexService, ResponseService],
  exports: [TypeOrmModule],
})
export class ComplexModule {}
