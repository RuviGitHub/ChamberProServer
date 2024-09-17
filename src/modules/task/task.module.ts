import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entity/task.entity';
import { ResponseService } from 'src/utils/response.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService, ResponseService],
  exports: [TypeOrmModule]
})
export class TaskModule {}
