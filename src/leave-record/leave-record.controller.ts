import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LeaveRecordService } from './leave-record.service';
import { CreateLeaveRecordDto } from './dto/create-leave-record.dto';
import { UpdateLeaveRecordDto } from './dto/update-leave-record.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/entities/auth-user.entity';

@Controller('leave-record')
@UseGuards(AuthGuard())
export class LeaveRecordController {
  constructor(private readonly leaveRecordService: LeaveRecordService) {}

  @Get('api/recent-leave')
  getRecentLeaves(@GetUser() user: User) {
    return this.leaveRecordService.getRecentLeaves(user.id);
  }

  // @Post()
  // create(@Body() createLeaveRecordDto: CreateLeaveRecordDto) {
  //   return this.leaveRecordService.create(createLeaveRecordDto);
  // }

  // @Get()
  // findAll() {
  //   return this.leaveRecordService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.leaveRecordService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateLeaveRecordDto: UpdateLeaveRecordDto,
  // ) {
  //   return this.leaveRecordService.update(+id, updateLeaveRecordDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.leaveRecordService.remove(+id);
  // }
}
