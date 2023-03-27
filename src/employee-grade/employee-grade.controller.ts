import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EmployeeGradeService } from './employee-grade.service';
import { CreateEmployeeGradeDto } from './dto/create-employee-grade.dto';
import { UpdateEmployeeGradeDto } from './dto/update-employee-grade.dto';
import { EmployeeGrade } from './entities/employee-grade.entity';

@Controller('employee-grade')
export class EmployeeGradeController {
  constructor(private readonly employeeGradeService: EmployeeGradeService) {}

  @Post()
  create(
    @Body() createEmployeeGradeDto: CreateEmployeeGradeDto,
  ): Promise<EmployeeGrade> {
    return this.employeeGradeService.create(createEmployeeGradeDto);
  }

  @Get()
  findAll(): Promise<EmployeeGrade[]> {
    return this.employeeGradeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EmployeeGrade> {
    return this.employeeGradeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeGradeDto: UpdateEmployeeGradeDto,
  ): Promise<EmployeeGrade> {
    return this.employeeGradeService.update(id, updateEmployeeGradeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeeGradeService.remove(id);
  }
}
