import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { CreditTenure } from '../enum/Credit.enum';
import { MaternityStatus } from '../enum/Maternity.enum';

export class UpdateLeaveTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsNumber()
  minimum_days_before: number;

  @IsDecimal()
  @IsPositive()
  credit: number;

  @IsEnum(CreditTenure)
  @IsNotEmpty()
  credit_tenure: CreditTenure;

  @IsEnum(MaternityStatus)
  @IsNotEmpty()
  apply_to_gender: MaternityStatus;

  @IsNumber()
  minimum_job_tenure: number;

  @IsString()
  @IsOptional()
  is_active: string;
}
