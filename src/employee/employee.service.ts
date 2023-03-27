import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
// import { GetProfileDto } from './dto/get-profile.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { LeaveBalanceService } from '../leave-balance/leave-balance.service';
import { LeaveBalance } from '../leave-balance/entities/leave-balance.entity';
import { createQuery } from 'mysql2/typings/mysql/lib/Connection';
import { jwtContants } from 'src/auth/contants';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
    @InjectRepository(LeaveBalance)
    private leaveBalanceRepo: Repository<LeaveBalance>,
  ) {}

  // Get Profile
  async getUserProfile() {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const {
      name,
      branch_id,
      department_id,
      designation_id,
      date_of_joining,
      phone,
      user_id,
    } = createEmployeeDto;

    const employee = new Employee();
    employee.name = name;
    employee.branch_id = branch_id;
    employee.department_id = department_id;
    employee.designation_id = designation_id;
    employee.date_of_joining = date_of_joining;
    employee.phone = phone;
    employee.user.id = user_id;

    await this.employeeRepo.save(employee);
    return employee;
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepo.find();
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepo.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException('employee not found');
    }
    return employee;
  }

  async findEmployeeByUserId(userId: number): Promise<any> {
    const employee = await this.employeeRepo
      .createQueryBuilder('employee')
      .select(['employee.name', 'employee.photo', 'employee.id'])
      .where('employee.user_id = :user_id', { user_id: userId })
      .getOne();
    const balance = await this.leaveBalanceRepo
      .createQueryBuilder('leave_balance')
      .select('SUM(leave_balance.balance)', 'balance')
      .where('leave_balance.employee_id = :id', { id: employee.id })
      .andWhere('leave_balance.leave_type_id = :type', { type: 1 })
      .getRawOne();

    if (!employee) {
      throw new NotFoundException('employee not found');
    }
    return {
      status: true,
      message: 'some message',
      data: {
        name: employee.name,
        image: employee.photo,
        leave_balance: balance.balance,
        encashable: 0,
      },
    };
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const {
      name,
      branch_id,
      department_id,
      designation_id,
      phone,
      date_of_joining,
      is_active,
    } = updateEmployeeDto;

    const employee = await this.findOne(id);
    if (!employee) {
      throw new NotFoundException('employee not found');
    }
    employee.name = name;
    employee.branch_id = branch_id;
    employee.department_id = department_id;
    employee.designation_id = designation_id;
    employee.phone = phone;
    employee.date_of_joining = date_of_joining;
    employee.is_active = is_active;

    await this.employeeRepo.save(employee);
    return employee;
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    if (!employee) {
      throw new NotFoundException('employee not found');
    }
    await this.employeeRepo.remove(employee);
  }
}
