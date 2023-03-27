import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateLeaveRecordDto } from './dto/create-leave-record.dto';
import { UpdateLeaveRecordDto } from './dto/update-leave-record.dto';
import { LeaveRecord } from './entities/leave-record.entity';
import { StatusColor } from './entities/color.entity';

@Injectable()
export class LeaveRecordService {
  constructor(
    @InjectRepository(LeaveRecord)
    private leaveRecordRepo: Repository<LeaveRecord>,
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
    @InjectRepository(StatusColor)
    private statusColor: Repository<StatusColor>,
  ) {}

  async getRecentLeaves(userId: number): Promise<any> {
    const employee = await this.employeeRepo
      .createQueryBuilder('employee')
      .select()
      .where('employee.user_id = :user_id', { user_id: userId })
      .getOne();

    const recentLeaves = await this.leaveRecordRepo
      .createQueryBuilder('leave_record')
      .select([
        'leave_record.id AS id',
        'leave_record.no_of_days AS no_of_days',
        'leave_record.from_date AS from_date',
        'leave_record.to_date AS to_date',
        'leave_record.approval_status AS approval_status',
      ])
      .where('leave_record.employee_id = :id', { id: employee.id })
      .getRawMany();

    const colors = await this.statusColor.find();

    const arr1 = colors.reduce((acc, item) => {
      acc[item.id] = item.color;
      return acc;
    }, {});

    const status = {
      1: 'Pending',
      2: 'Approved',
      3: 'Approved without Pay',
      4: 'Reject',
      5: 'Cancelled',
    };

    const newArr = recentLeaves.map((item: any): any => {
      return {
        ...item,
        label: item.no_of_days > 0.5 ? 'Full Day' : 'Half Day',
        color: arr1[item.approval_status],
        status: status[item.approval_status],
      };
    });

    return {
      status: true,
      message: 'some message',
      data: [newArr],
    };
  }

  // create(createLeaveRecordDto: CreateLeaveRecordDto) {
  //   return 'This action adds a new leaveRecord';
  // }

  // findAll() {
  //   return `This action returns all leaveRecord`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} leaveRecord`;
  // }

  // update(id: number, updateLeaveRecordDto: UpdateLeaveRecordDto) {
  //   return `This action updates a #${id} leaveRecord`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} leaveRecord`;
  // }
}
