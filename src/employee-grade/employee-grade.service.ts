import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeGradeDto } from './dto/create-employee-grade.dto';
import { UpdateEmployeeGradeDto } from './dto/update-employee-grade.dto';
import { EmployeeGrade } from './entities/employee-grade.entity';

@Injectable()
export class EmployeeGradeService {
  constructor(
    @InjectRepository(EmployeeGrade)
    private employeeGradeRepo: Repository<EmployeeGrade>,
  ) {}

  async create(
    createEmployeeGradeDto: CreateEmployeeGradeDto,
  ): Promise<EmployeeGrade> {
    const { name, tenure, leave_balance_per_month } = createEmployeeGradeDto;
    const employeeGrade = new EmployeeGrade();
    employeeGrade.name = name;
    employeeGrade.tenure = tenure;
    employeeGrade.leave_balance_per_month = leave_balance_per_month;

    await this.employeeGradeRepo.save(employeeGrade);
    return employeeGrade;
  }

  async findAll(): Promise<EmployeeGrade[]> {
    return await this.employeeGradeRepo.find();
  }

  async findOne(id: number): Promise<EmployeeGrade> {
    const employeeGrade = await this.employeeGradeRepo.findOne({
      where: { id },
    });
    if (!employeeGrade) {
      throw new NotFoundException('employee Grade not found!');
    }
    return employeeGrade;
  }

  async update(
    id: number,
    updateEmployeeGradeDto: UpdateEmployeeGradeDto,
  ): Promise<EmployeeGrade> {
    const { name, tenure, leave_balance_per_month, is_active } =
      updateEmployeeGradeDto;
    const employeeGrade = await this.findOne(id);
    if (!employeeGrade) {
      throw new NotFoundException('employee grade not found!');
    }
    employeeGrade.name = name;
    employeeGrade.tenure = tenure;
    employeeGrade.leave_balance_per_month = leave_balance_per_month;
    employeeGrade.is_active = is_active;

    await this.employeeGradeRepo.save(employeeGrade);
    return employeeGrade;
  }

  async remove(id: number) {
    const employeeGrade = await this.findOne(id);
    if (!employeeGrade) {
      throw new NotFoundException('employee grade not found!');
    }
    await this.employeeGradeRepo.remove(employeeGrade);
  }
}
