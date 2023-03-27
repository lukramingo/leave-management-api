import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateDesignationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  name: string;

  @IsOptional()
  @IsString()
  is_active: string;
}
