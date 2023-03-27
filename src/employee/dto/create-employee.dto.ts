import { IsString, IsNumber, IsDate, IsPhoneNumber } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsNumber()
  branch_id: number;

  @IsNumber()
  department_id: number;

  @IsNumber()
  designation_id: number;

  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsDate()
  date_of_joining: Date;

  @IsNumber()
  user_id: number;
}
