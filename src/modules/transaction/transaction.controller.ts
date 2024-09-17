import { Body, Controller, Get, ParseIntPipe, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ResponseService } from 'src/utils/response.service';
import { StatusChangeDTO } from 'src/dto/common/status-change.dto';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from 'src/dto/transaction/create-transaction.dto';
import { PaginationTransactionQueryDTO } from 'src/dto/transaction/paginated-query.dto';
import { PaginatedTransactionDTO } from 'src/dto/transaction/paginated-transaction.dto';
import { UpdateTransactionDto } from 'src/dto/transaction/update-transaction.dto';



@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly service: TransactionService,
    private readonly response: ResponseService,
  ) {}

  @Post('create-transaction')
  async registerTransaction(@Body() dto: CreateTransactionDto, @Res() res) {
    const transaction = await this.service.registerTransaction(dto);
    return this.response.sendSuccessResponse(res, 'Transaction registered.', transaction);
  }


  @Get()
  async viewTransaction(@Query('id', ParseIntPipe) id: number, @Res() res) {
    const transaction = await this.service.viewTransaction(id);
    return this.response.sendSuccessResponse(res, 'Transactions retrieved.', transaction);
  }

  @Get('all-paginated')
  async getAllTransactions(@Query() query: PaginationTransactionQueryDTO, @Res() res) {
    const result: PaginatedTransactionDTO =
      await this.service.getTransactionsPaginated(query);
    return this.response.sendSuccessResponse(res, 'Transactions retrieved.', result);
  }

  @Post('status-change')
  async changeStatus(@Body() dto: StatusChangeDTO, @Res() res) {
    const transaction = await this.service.changeStatus(dto);
    return this.response.sendSuccessResponse(res,'Transactions status changed.',transaction);
  }

  @Post('update-Transaction')
  async updateTransaction(@Body() dto: UpdateTransactionDto,@Res() res,) {
    const updatedTransaction = await this.service.updateTransaction(dto);
    return this.response.sendSuccessResponse(res, 'Transaction updated successfully.', updatedTransaction);
  }
}
