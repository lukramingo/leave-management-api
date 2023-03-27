import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { LeaveTypeService } from './leave-type.service';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { LeaveType } from './entities/leave-type.entity';
import { CreditTenure } from './enum/Credit.enum';
import { CreditValidationPipe } from './pipe/credit.validation';
import { MaternityValidationPipe } from './pipe/maternity.validation';
import { MaternityStatus } from './enum/Maternity.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/entities/auth-user.entity';

@Controller('leave-type')
@UseGuards(AuthGuard())
export class LeaveTypeController {
  constructor(private readonly leaveTypeService: LeaveTypeService) {}

  @Post()
  async create(
    @Body() createLeaveTypeDto: CreateLeaveTypeDto,
    @Body('credit_tenure', CreditValidationPipe) credit_tenure: CreditTenure,
  ): Promise<LeaveType> {
    return await this.leaveTypeService.create(
      createLeaveTypeDto,
      credit_tenure,
    );
  }
  //GET leave-types: Authorization Bearer Token
  @Get()
  async findLeaves(@GetUser() user: User): Promise<any> {
    return await this.leaveTypeService.findLeavesType(user.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<LeaveType> {
    return await this.leaveTypeService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLeaveTypeDto: UpdateLeaveTypeDto,
    @Body('credit_tenure', CreditValidationPipe) credit_tenure: CreditTenure,
    @Body('apply_to_gender', MaternityValidationPipe)
    apply_to_gender: MaternityStatus,
  ): Promise<LeaveType> {
    return await this.leaveTypeService.update(
      id,
      updateLeaveTypeDto,
      credit_tenure,
      apply_to_gender,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveTypeService.remove(+id);
  }
}
