import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  name: string;
}
