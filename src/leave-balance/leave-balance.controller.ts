import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeaveBalanceService } from './leave-balance.service';
import { CreateLeaveBalanceDto } from './dto/create-leave-balance.dto';
import { UpdateLeaveBalanceDto } from './dto/update-leave-balance.dto';

@Controller('leave-balance')
export class LeaveBalanceController {
  constructor(private readonly leaveBalanceService: LeaveBalanceService) {}

  @Post()
  create(@Body() createLeaveBalanceDto: CreateLeaveBalanceDto) {
    return this.leaveBalanceService.create(createLeaveBalanceDto);
  }

  @Get()
  findAll() {
    return this.leaveBalanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveBalanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaveBalanceDto: UpdateLeaveBalanceDto) {
    return this.leaveBalanceService.update(+id, updateLeaveBalanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveBalanceService.remove(+id);
  }
}
