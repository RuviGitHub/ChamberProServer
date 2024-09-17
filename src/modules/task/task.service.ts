import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { FindOptionsWhere, Like, Repository } from 'typeorm';
  import { StatusChangeDTO } from 'src/dto/common/status-change.dto';
  import { UpdateTaskDTO } from 'src/dto/Task/update-Task.dto';
import { Task } from 'src/entity/task.entity';
import { CreateTaskDTO } from 'src/dto/task/create-task.dto';
import { PaginationTaskQueryDTO } from 'src/dto/task/paginated-query.dto';
import { PaginatedTaskDTO } from 'src/dto/task/paginated-case.dto';
  
  @Injectable()
  export class TaskService {
    constructor(
      @InjectRepository(Task)
      private readonly repository: Repository<Task>,
    ) {}

    async registerTask(dto: CreateTaskDTO) {
      try {
        const existingEntity = await this.findByTaskName(dto.task_name);
  
        if (existingEntity) {
          throw new NotFoundException('Task no already exists.');
        }
  
        const task = this.repository.create({
          ...dto,
          status: 1,
          is_active: true,
        });
  
        return await this.repository.save(task);
      } catch (error) {
        console.error('Error registering Task:', error.message);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error registering task.');
      }
    }
   
    async getTasksPaginated(paginationQuery: PaginationTaskQueryDTO,): Promise<PaginatedTaskDTO> {
      try {
        const {
          page = 1,
          perPage = 10,
          order = 1,
          search,
          status,
          priority,
          assigner_id,
          task_due_date,
        } = paginationQuery;
  
        // Determine the sort direction
        const orderDirection: 'ASC' | 'DESC' = order === 1 ? 'ASC' : 'DESC';
  
        // Build where conditions for querying Tasks
        const whereConditions: FindOptionsWhere<Task> = {
          ...(search && { task_name: Like(`%${search}%`) }),
          ...(status && { status }),
          ...(priority && { priority: Number(priority) }),
          ...(assigner_id && { task_assigner_id: Number(assigner_id) }),
          ...(task_due_date && { task_due_date: task_due_date }),
        };
  
        // Query the Tasks with pagination and filtering
        const [tasks, total] = await this.repository.findAndCount({
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
          tasks,
        };
      } catch (error) {
        console.error('Error retrieving tasks:', error);
        throw new InternalServerErrorException('Error retrieving tasks.');
      }
    }
  
    async viewTask(id: number): Promise<Task> {
      try {
        const task = await this.findById(id);
        
        if (!task) {
          throw new NotFoundException('Task not found.');
        }
        return task;
      } catch (error) {
        console.error('Error changing Task status:', error);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error changing task status.');
      }
    }
   
    async changeStatus(dto: StatusChangeDTO): Promise<Task> {
      try {
        const task = await this.findById(dto.id);
        if (!task) {
          throw new NotFoundException('Task not found.');
        }
        // Update the Task's status and timestamp
        task.status = dto.status;
        task.updated_at = new Date();
  
        // Save the updated Task to the database
        return await this.repository.save(task);
      } catch (error) {
        console.error('Error changing task status:', error);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error changing task status.');
      }
    }
   
    async updateTask(dto: UpdateTaskDTO): Promise<Task> {
      try {
        const cse = await this.findById(dto.task_id);
  
        if (!cse) {
          throw new NotFoundException('Task not found.');
        }
  
        // Update the Task with new data
        this.repository.merge(cse, dto);
        cse.updated_at = new Date();
  
        return await this.repository.save(cse);
      } catch (error) {
        console.error('Error updating task:', error.message);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error updating task.');
      }
    }
  
    async findByTaskName(task_name: string): Promise<Task | null> {
      return await this.repository.findOne({ where: { task_name } });
    }
  
    async findById(id: number): Promise<Task | null> {
      return await this.repository.findOne({ where: { task_id: id } });
    }
  }
  