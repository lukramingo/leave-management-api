import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { LeaveBalanceModule } from '../leave-balance/leave-balance.module';
import { AuthModule } from '../auth/auth.module';
import { LeaveBalance } from '../leave-balance/entities/leave-balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, LeaveBalance]), AuthModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
