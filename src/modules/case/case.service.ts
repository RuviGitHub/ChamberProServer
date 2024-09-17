import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { CreateCaseDTO } from 'src/dto/Case/create-Case.dto';
  import { Case } from 'src/entity/Case.entity';
  import { FindOptionsWhere, Like, Repository } from 'typeorm';
  import { PaginationCaseQueryDTO } from 'src/dto/case/paginated-query.dto';
  import { PaginatedCaseDTO } from '../../dto/Case/paginated-Case.dto';
  import { StatusChangeDTO } from 'src/dto/common/status-change.dto';
  import { UpdateCaseDTO } from 'src/dto/Case/update-Case.dto';
  
  @Injectable()
  export class CaseService {
    constructor(
      @InjectRepository(Case)
      private readonly repository: Repository<Case>,
    ) {}

    async registerCase(dto: CreateCaseDTO) {
      try {
        const existingEntity = await this.findByCaseNo(dto.case_no);
  
        if (existingEntity) {
          throw new NotFoundException('Case no already exists.');
        }
  
        const Case = this.repository.create({
          ...dto,
          status: 1,
          is_active: true,
        });
  
        return await this.repository.save(Case);
      } catch (error) {
        console.error('Error registering Case:', error.message);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error registering Case.');
      }
    }
   
    async getCasesPaginated(paginationQuery: PaginationCaseQueryDTO,): Promise<PaginatedCaseDTO> {
      try {
        const {
          page = 1,
          perPage = 10,
          order = 1,
          search,
          status,
          case_type,
        } = paginationQuery;
  
        // Determine the sort direction
        const orderDirection: 'ASC' | 'DESC' = order === 1 ? 'ASC' : 'DESC';
  
        // Build where conditions for querying Cases
        const whereConditions: FindOptionsWhere<Case> = {
          ...(search && { case_no: Like(`%${search}%`) }),
          ...(status && { status }),
          ...(case_type && { case_type: Number(case_type) }),
        };
  
        // Query the Cases with pagination and filtering
        const [cases, total] = await this.repository.findAndCount({
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
          cases,
        };
      } catch (error) {
        console.error('Error retrieving Cases:', error);
        throw new InternalServerErrorException('Error retrieving Cases.');
      }
    }
  
    async viewCase(id: number): Promise<Case> {
      try {
        const cse = await this.findById(id);
        
        if (!cse) {
          throw new NotFoundException('Case not found.');
        }
        return cse;
      } catch (error) {
        console.error('Error changing case status:', error);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error changing case status.');
      }
    }
   
    async changeStatus(dto: StatusChangeDTO): Promise<Case> {
      try {
        const cse = await this.findById(dto.id);
        if (!cse) {
          throw new NotFoundException('Case not found.');
        }
        // Update the Case's status and timestamp
        cse.status = dto.status;
        cse.updated_at = new Date();
  
        // Save the updated Case to the database
        return await this.repository.save(cse);
      } catch (error) {
        console.error('Error changing case status:', error);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error changing case status.');
      }
    }
   
    async updateCase(dto: UpdateCaseDTO): Promise<Case> {
      try {
        const cse = await this.findById(dto.case_id);
  
        if (!cse) {
          throw new NotFoundException('Case not found.');
        }
  
        // Update the Case with new data
        this.repository.merge(cse, dto);
        cse.updated_at = new Date();
  
        return await this.repository.save(cse);
      } catch (error) {
        console.error('Error updating case:', error.message);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error updating case.');
      }
    }
  
    async findByCaseNo(case_no: string): Promise<Case | null> {
      return await this.repository.findOne({ where: { case_no } });
    }
  
    async findById(id: number): Promise<Case | null> {
      return await this.repository.findOne({ where: { case_id: id } });
    }
  }
  