import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleLeaveApprovalDto } from './create-role-leave-approval.dto';

export class UpdateRoleLeaveApprovalDto extends PartialType(CreateRoleLeaveApprovalDto) {}
