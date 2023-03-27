import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLeaveRecordDto {
  @IsNotEmpty()
  @IsDateString()
  from_date: string;

  @IsNotEmpty()
  @IsDateString()
  to_date: string;

  @IsNotEmpty()
  @IsNumber()
  leave_type_id: number;

  @IsNotEmpty()
  @IsString()
  reason_for_leave: string;

  @IsNotEmpty()
  @IsNumber()
  no_of_days: number;
}
