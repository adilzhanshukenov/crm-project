import { Controller, Get } from '@nestjs/common';
import { TaskPriority } from './taskPriority.enum';

@Controller('taskpriority')
class TaskPriorityController {
  @Get()
  getTaskPriorities() {
    return Object.values(TaskPriority);
  }
}

export default TaskPriorityController;
