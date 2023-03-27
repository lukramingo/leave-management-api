import { Module } from '@nestjs/common';
import { RoleLeaveApprovalService } from './role-leave-approval.service';
import { RoleLeaveApprovalController } from './role-leave-approval.controller';

@Module({
  controllers: [RoleLeaveApprovalController],
  providers: [RoleLeaveApprovalService]
})
export class RoleLeaveApprovalModule {}
