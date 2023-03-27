import { Module } from '@nestjs/common';
import { EmployeeGradeService } from './employee-grade.service';
import { EmployeeGradeController } from './employee-grade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeGrade } from './entities/employee-grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeGrade])],
  controllers: [EmployeeGradeController],
  providers: [EmployeeGradeService],
})
export class EmployeeGradeModule {}
