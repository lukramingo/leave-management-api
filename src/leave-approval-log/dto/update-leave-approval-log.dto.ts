import { PartialType } from '@nestjs/mapped-types';
import { CreateLeaveApprovalLogDto } from './create-leave-approval-log.dto';

export class UpdateLeaveApprovalLogDto extends PartialType(CreateLeaveApprovalLogDto) {}
