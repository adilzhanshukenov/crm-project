import { Controller, Get } from '@nestjs/common';
import { TaskStatus } from './taskStatus.enum';

@Controller('taskstatus')
class TaskStatusController {
  @Get()
  getTaskStatuses() {
    return Object.values(TaskStatus);
  }
}

export default TaskStatusController;
