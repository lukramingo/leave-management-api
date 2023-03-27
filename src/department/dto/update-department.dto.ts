import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateDepartmentDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Length(5, 20)
  name: string;

  @IsOptional()
  @IsString()
  is_active: string;
}
