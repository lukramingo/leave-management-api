import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { Designation } from './entities/designation.entity';

@Injectable()
export class DesignationService {
  constructor(
    @InjectRepository(Designation)
    private designationRepo: Repository<Designation>,
  ) {}
  async create({ name }: CreateDesignationDto): Promise<Designation> {
    const designation = new Designation();
    designation.name = name;

    return await this.designationRepo.save(designation);
  }

  async findAll(): Promise<Designation[]> {
    return await this.designationRepo.find();
  }

  async findOne(id: number): Promise<Designation> {
    const designation = await this.designationRepo.findOne({ where: { id } });
    if (!designation) {
      throw new NotFoundException('designation not found');
    }
    return designation;
  }

  async update(
    id: number,
    { name, is_active }: UpdateDesignationDto,
  ): Promise<Designation> {
    const designation = await this.findOne(id);
    if (!designation) {
      throw new NotFoundException('designation not found');
    }
    designation.name = name;
    designation.is_active = is_active;
    return await this.designationRepo.save(designation);
  }

  async remove(id: number) {
    const designation = await this.findOne(id);
    if (!designation) {
      throw new NotFoundException('designation not found1');
    }
    await this.designationRepo.remove(designation);
  }
}
