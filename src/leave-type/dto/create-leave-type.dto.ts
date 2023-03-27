import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { CreditTenure } from '../enum/Credit.enum';

export class CreateLeaveTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  minimum_days_before: number;

  @IsNumber()
  credit: number;

  @IsNumber()
  minimum_job_tenure: number;

  @IsEnum(CreditTenure)
  @IsNotEmpty()
  credit_tenure: CreditTenure;
}
