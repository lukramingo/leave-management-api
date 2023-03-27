import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleLeaveApprovalService } from './role-leave-approval.service';
import { CreateRoleLeaveApprovalDto } from './dto/create-role-leave-approval.dto';
import { UpdateRoleLeaveApprovalDto } from './dto/update-role-leave-approval.dto';

@Controller('role-leave-approval')
export class RoleLeaveApprovalController {
  constructor(private readonly roleLeaveApprovalService: RoleLeaveApprovalService) {}

  @Post()
  create(@Body() createRoleLeaveApprovalDto: CreateRoleLeaveApprovalDto) {
    return this.roleLeaveApprovalService.create(createRoleLeaveApprovalDto);
  }

  @Get()
  findAll() {
    return this.roleLeaveApprovalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleLeaveApprovalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleLeaveApprovalDto: UpdateRoleLeaveApprovalDto) {
    return this.roleLeaveApprovalService.update(+id, updateRoleLeaveApprovalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleLeaveApprovalService.remove(+id);
  }
}
