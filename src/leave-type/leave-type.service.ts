import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { LeaveType } from './entities/leave-type.entity';
import { CreditTenure } from './enum/Credit.enum';
import { MaternityStatus } from './enum/Maternity.enum';

@Injectable()
export class LeaveTypeService {
  constructor(
    @InjectRepository(LeaveType)
    private leaveTypeRepo: Repository<LeaveType>,
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
  ) {}

  async create(
    createLeaveTypeDto: CreateLeaveTypeDto,
    credit_tenure: CreditTenure,
  ): Promise<LeaveType> {
    const {
      name,
      description,
      minimum_days_before,
      credit,
      minimum_job_tenure,
    } = createLeaveTypeDto;
    const leaveType = new LeaveType();
    leaveType.name = name;
    leaveType.description = description;
    leaveType.minimum_days_before = minimum_days_before;
    leaveType.credit = credit;
    leaveType.minimum_job_tenure = minimum_job_tenure;
    leaveType.credit_tenure = credit_tenure;

    await this.leaveTypeRepo.save(leaveType);
    return leaveType;
  }

  async findLeavesType(userId: number): Promise<any> {
    const employee = await this.employeeRepo
      .createQueryBuilder('employee')
      .select()
      .where('employee.user_id = :user_id', { user_id: userId })
      .getOne();

    const leaves = await this.leaveTypeRepo
      .createQueryBuilder('leave_type')
      .select('leave_balance.leave_type_id', 'leaveTypeId')
      .addSelect('leave_type.name', 'name')
      .addSelect('SUM(leave_balance.balance)', 'balance')
      .addSelect(
        'IF(leave_type_id = 2,true,IF(SUM(leave_balance.balance) > 0,true,false))',
        'canApply',
      )
      .addSelect('leave_type.icon', 'icon')
      .addSelect('IF(leave_type.is_active = 1, FALSE, TRUE)', 'hidden')
      .leftJoin('leave_type.leaveBalances', 'leave_balance')
      .where('leave_balance.employee_id = :employeeId', {
        employeeId: employee.id,
      })
      .groupBy('leave_balance.leave_type_id')
      .getRawMany();

    const leaveType = this.leaveTypeRepo.find();

    // const arr1 = leaveType.reduce((acc, item) => {
    //   acc[item.id] = item.color;
    //   return acc;
    // }, {});

    // return leaveType;

    return {
      status: true,
      message: 'some message',
      data: { leaves },
    };
  }

  async findOne(id: number): Promise<LeaveType> {
    const leaveType = await this.leaveTypeRepo.findOne({ where: { id } });
    if (!leaveType) {
      throw new NotFoundException('your leave type not found');
    }
    return leaveType;
  }

  async update(
    id: number,
    updateLeaveTypeDto: UpdateLeaveTypeDto,
    credit_tenure: CreditTenure,
    apply_to_gender: MaternityStatus,
  ): Promise<LeaveType> {
    const {
      name,
      description,
      minimum_days_before,
      credit,
      minimum_job_tenure,
      is_active,
    } = updateLeaveTypeDto;
    const leaveType = await this.findOne(id);
    if (!leaveType) {
      throw new NotFoundException('leave type not found');
    }

    leaveType.name = name;
    leaveType.description = description;
    leaveType.minimum_days_before = minimum_days_before;
    leaveType.credit = credit;
    leaveType.credit_tenure = credit_tenure;
    leaveType.apply_to_gender = apply_to_gender;
    leaveType.minimum_job_tenure = minimum_job_tenure;
    leaveType.is_active = is_active;

    await this.leaveTypeRepo.save(leaveType);
    return leaveType;
  }

  async remove(id: number) {
    const leaveType = await this.findOne(id);
    if (!leaveType) {
      throw new NotFoundException('leave type not found!');
    }
    await this.leaveTypeRepo.remove(leaveType);
  }
}
