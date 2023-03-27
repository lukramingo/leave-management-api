import { IsString, IsNumber, IsDate, IsPhoneNumber } from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  name: string;

  @IsNumber()
  branch_id: number;

  @IsNumber()
  department_id: number;

  @IsNumber()
  designation_id: number;

  @IsPhoneNumber()
  @IsString()
  phone: string;

  @IsDate()
  date_of_joining: Date;

  @IsString()
  is_active: string;
}
