import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateEmployeeGradeDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  name: string;

  @IsNumber()
  tenure: number;

  @IsNumber()
  leave_balance_per_month: number;
}
