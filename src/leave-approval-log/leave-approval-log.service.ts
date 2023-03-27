import { Injectable } from '@nestjs/common';
import { CreateLeaveApprovalLogDto } from './dto/create-leave-approval-log.dto';
import { UpdateLeaveApprovalLogDto } from './dto/update-leave-approval-log.dto';

@Injectable()
export class LeaveApprovalLogService {
  create(createLeaveApprovalLogDto: CreateLeaveApprovalLogDto) {
    return 'This action adds a new leaveApprovalLog';
  }

  findAll() {
    return `This action returns all leaveApprovalLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leaveApprovalLog`;
  }

  update(id: number, updateLeaveApprovalLogDto: UpdateLeaveApprovalLogDto) {
    return `This action updates a #${id} leaveApprovalLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} leaveApprovalLog`;
  }
}
