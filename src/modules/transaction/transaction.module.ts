import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from 'src/utils/response.service';
import { Transaction } from 'src/entity/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionController],
  providers: [TransactionService, ResponseService],
  exports: [TypeOrmModule]
})
export class TransactionModule {}
