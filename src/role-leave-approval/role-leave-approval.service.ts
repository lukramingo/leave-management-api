import { Injectable } from '@nestjs/common';
import { CreateRoleLeaveApprovalDto } from './dto/create-role-leave-approval.dto';
import { UpdateRoleLeaveApprovalDto } from './dto/update-role-leave-approval.dto';

@Injectable()
export class RoleLeaveApprovalService {
  create(createRoleLeaveApprovalDto: CreateRoleLeaveApprovalDto) {
    return 'This action adds a new roleLeaveApproval';
  }

  findAll() {
    return `This action returns all roleLeaveApproval`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleLeaveApproval`;
  }

  update(id: number, updateRoleLeaveApprovalDto: UpdateRoleLeaveApprovalDto) {
    return `This action updates a #${id} roleLeaveApproval`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleLeaveApproval`;
  }
}
