import { Module } from '@nestjs/common';
import { LeaveTypeService } from './leave-type.service';
import { LeaveTypeController } from './leave-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveType } from './entities/leave-type.entity';
import { Employee } from '../employee/entities/employee.entity';
import { AuthModule } from '../auth/auth.module';
import { LeaveBalance } from '../leave-balance/entities/leave-balance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeaveType, Employee, LeaveBalance]),
    AuthModule,
  ],
  controllers: [LeaveTypeController],
  providers: [LeaveTypeService],
})
export class LeaveTypeModule {}
