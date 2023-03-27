import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateEmployeeGradeDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  name: string;

  @IsNumber()
  tenure: number;

  @IsNumber()
  leave_balance_per_month: number;

  @IsString()
  @IsOptional()
  is_active: string;
}
