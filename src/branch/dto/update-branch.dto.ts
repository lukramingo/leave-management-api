import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateBranchDto {
  @IsOptional()
  @IsString()
  @Length(5, 20)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  is_active: string;
}
