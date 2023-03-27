import { Module } from '@nestjs/common';
import { LeaveBalanceService } from './leave-balance.service';
import { LeaveBalanceController } from './leave-balance.controller';
import { LeaveBalance } from './entities/leave-balance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LeaveType } from '../leave-type/entities/leave-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveBalance, LeaveType]), AuthModule],
  controllers: [LeaveBalanceController],
  providers: [LeaveBalanceService],
})
export class LeaveBalanceModule {}
