import { Task } from 'src/entity/task.entity';

export class PaginatedTaskDTO {
  page: number;
  perPage: number;
  total: number;
  tasks: Task[];
}
