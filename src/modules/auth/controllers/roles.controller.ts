import { Controller, Get } from '@nestjs/common';
import { Role } from '../enums/roles.enum';

@Controller('roles')
export class RolesController {
  @Get()
  fetchGlobalRoles() {
    return Object.values(Role);
  }
}
