import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './entities/branch.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private branchRepo: Repository<Branch>,
  ) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const { name } = createBranchDto;
    const branch = new Branch();
    branch.name = name;
    await this.branchRepo.save(branch);
    return branch;
  }

  async findAll(): Promise<Branch[]> {
    return await this.branchRepo.find();
  }

  async findOne(id: number): Promise<Branch> {
    const branch = await this.branchRepo.findOne({ where: { id } });
    if (!branch) {
      throw new NotFoundException(`${branch.name} not found!`);
    }
    return branch;
  }

  async update(
    id: number,
    { name, is_active }: UpdateBranchDto,
  ): Promise<Branch> {
    const branch = await this.branchRepo.findOneBy({ id });
    if (!branch) {
      throw new NotFoundException('branch not exist');
    }
    branch.name = name;
    branch.is_active = is_active;
    return await this.branchRepo.save(branch);
  }

  async remove(id: number) {
    const branch = await this.findOne(id);
    if (!branch) {
      throw new NotFoundException('branch not exist');
    }
    await this.branchRepo.remove(branch);
  }
}
