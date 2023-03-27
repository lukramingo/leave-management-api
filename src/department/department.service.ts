import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const { name } = createDepartmentDto;
    const department = new Department();
    department.name = name;
    await this.departmentRepo.save(department);
    return department;
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepo.find();
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepo.findOne({ where: { id } });
    if (!department) {
      throw new NotFoundException('department not found!');
    }
    return department;
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const { name, is_active } = updateDepartmentDto;
    const department = await this.findOne(id);
    if (!department) {
      throw new NotFoundException('department not found');
    }
    department.name = name;
    department.is_active = is_active;

    await this.departmentRepo.save(department);
    return department;
  }

  async remove(id: number) {
    const department = await this.findOne(id);
    if (!department) {
      throw new NotFoundException('department not found!');
    }
    await this.departmentRepo.remove(department);
  }
}
