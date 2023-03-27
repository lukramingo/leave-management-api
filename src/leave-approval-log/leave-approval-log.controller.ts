import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeaveApprovalLogService } from './leave-approval-log.service';
import { CreateLeaveApprovalLogDto } from './dto/create-leave-approval-log.dto';
import { UpdateLeaveApprovalLogDto } from './dto/update-leave-approval-log.dto';

@Controller('leave-approval-log')
export class LeaveApprovalLogController {
  constructor(private readonly leaveApprovalLogService: LeaveApprovalLogService) {}

  @Post()
  create(@Body() createLeaveApprovalLogDto: CreateLeaveApprovalLogDto) {
    return this.leaveApprovalLogService.create(createLeaveApprovalLogDto);
  }

  @Get()
  findAll() {
    return this.leaveApprovalLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveApprovalLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaveApprovalLogDto: UpdateLeaveApprovalLogDto) {
    return this.leaveApprovalLogService.update(+id, updateLeaveApprovalLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveApprovalLogService.remove(+id);
  }
}
