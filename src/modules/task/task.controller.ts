import { Body, Controller, Get, ParseIntPipe, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ResponseService } from 'src/utils/response.service';
import { StatusChangeDTO } from 'src/dto/common/status-change.dto';
import { CreateTaskDTO } from 'src/dto/task/create-task.dto';
import { PaginationTaskQueryDTO } from 'src/dto/task/paginated-query.dto';
import { PaginatedTaskDTO } from 'src/dto/task/paginated-case.dto';
import { UpdateTaskDTO } from 'src/dto/task/update-task.dto';
import { TaskService } from './task.service';



@Controller('task')
export class TaskController {
  constructor(
    private readonly service: TaskService,
    private readonly response: ResponseService,
  ) {}

  @Post('create-task')
  async registerTask(@Body() dto: CreateTaskDTO, @Res() res) {
    const task = await this.service.registerTask(dto);
    return this.response.sendSuccessResponse(res, 'Task registered.', task);
  }


  @Get()
  async viewTask(@Query('id', ParseIntPipe) id: number, @Res() res) {
    const task = await this.service.viewTask(id);
    return this.response.sendSuccessResponse(res, 'Tasks retrieved.', task);
  }

  @Get('all-paginated')
  async getAllTasks(@Query() query: PaginationTaskQueryDTO, @Res() res) {
    const result: PaginatedTaskDTO =
      await this.service.getTasksPaginated(query);
    return this.response.sendSuccessResponse(res, 'Tasks retrieved.', result);
  }

  @Post('status-change')
  async changeStatus(@Body() dto: StatusChangeDTO, @Res() res) {
    const task = await this.service.changeStatus(dto);
    return this.response.sendSuccessResponse(res,'Tasks status changed.',task);
  }

  @Post('update-Task')
  async updateTask(@Body() dto: UpdateTaskDTO,@Res() res,) {
    const updatedTask = await this.service.updateTask(dto);
    return this.response.sendSuccessResponse(res, 'Task updated successfully.', updatedTask);
  }
}
