import { Module } from '@nestjs/common';
import { LeaveApprovalLogService } from './leave-approval-log.service';
import { LeaveApprovalLogController } from './leave-approval-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveApprovalLog } from './entities/leave-approval-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveApprovalLog])],
  controllers: [LeaveApprovalLogController],
  providers: [LeaveApprovalLogService],
})
export class LeaveApprovalLogModule {}
