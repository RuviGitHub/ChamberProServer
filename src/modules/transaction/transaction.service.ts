import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { FindOptionsWhere, Like, Repository } from 'typeorm';
  import { StatusChangeDTO } from 'src/dto/common/status-change.dto';
import { Transaction } from 'src/entity/transaction.entity';
import { CreateTransactionDto } from 'src/dto/transaction/create-transaction.dto';
import { PaginationTransactionQueryDTO } from 'src/dto/transaction/paginated-query.dto';
import { PaginatedTransactionDTO } from 'src/dto/transaction/paginated-transaction.dto';
import { UpdateTransactionDto } from 'src/dto/transaction/update-transaction.dto';


  
  @Injectable()
  export class TransactionService {
    constructor(
      @InjectRepository(Transaction)
      private readonly repository: Repository<Transaction>,
    ) {}

    async registerTransaction(dto: CreateTransactionDto) {
      try {
      
        const transaction = this.repository.create({
          ...dto,
            status:1,
            is_active:true
        });
  
        return await this.repository.save(transaction);
      } catch (error) {
        console.error('Error registering transaction:', error.message);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error registering transaction.');
      }
    }
   
    async getTransactionsPaginated(paginationQuery: PaginationTransactionQueryDTO,): Promise<PaginatedTransactionDTO> {
      try {
        const {
          page = 1,
          perPage = 10,
          order = 1,
          search,
          status,
          transaction_type,
          date,
        } = paginationQuery;
  
        // Determine the sort direction
        const orderDirection: 'ASC' | 'DESC' = order === 1 ? 'ASC' : 'DESC';
  
        // Build where conditions for querying Transactions
        const whereConditions: FindOptionsWhere<Transaction> = {
          ...(search && { source: Like(`%${search}%`) }),
          ...(status && { status }),
          ...(transaction_type && { transaction_type: Number(transaction_type) }),
          ...(date && { date: date }),
        };
  
        // Query the Transactions with pagination and filtering
        const [transactions, total] = await this.repository.findAndCount({
          where: whereConditions,
          order: {
            created_at: orderDirection,
          },
          skip: (page - 1) * perPage,
          take: perPage,
        });
  
        return {
          page,
          perPage,
          total,
          transactions,
        };
      } catch (error) {
        console.error('Error retrieving transactions:', error);
        throw new InternalServerErrorException('Error retrieving transactions.');
      }
    }
  
    async viewTransaction(id: number): Promise<Transaction> {
      try {
        const transaction = await this.findById(id);
        
        if (!transaction) {
          throw new NotFoundException('Transaction not found.');
        }
        return transaction;
      } catch (error) {
        console.error('Error changing transaction status:', error);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error changing transaction status.');
      }
    }
   
    async changeStatus(dto: StatusChangeDTO): Promise<Transaction> {
      try {
        const transaction = await this.findById(dto.id);
        if (!transaction) {
          throw new NotFoundException('Transaction not found.');
        }
        // Update the Transaction's status and timestamp
        transaction.status = dto.status;
        transaction.updated_at = new Date();
  
        // Save the updated Transaction to the database
        return await this.repository.save(transaction);
      } catch (error) {
        console.error('Error changing transaction status:', error);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error changing transaction status.');
      }
    }
   
    async updateTransaction(dto: UpdateTransactionDto): Promise<Transaction> {
      try {
        const transaction = await this.findById(dto.transaction_id);
  
        if (!transaction) {
          throw new NotFoundException('Transaction not found.');
        }
  
        // Update the Transaction with new data
        this.repository.merge(transaction, dto);
        transaction.updated_at = new Date();
  
        return await this.repository.save(transaction);
      } catch (error) {
        console.error('Error updating Transaction:', error.message);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error updating Transaction.');
      }
    }
  
    async findById(id: number): Promise<Transaction | null> {
      return await this.repository.findOne({ where: { transaction_id: id } });
    }
  }
  