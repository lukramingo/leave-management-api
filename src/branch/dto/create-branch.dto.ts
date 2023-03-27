import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  name: string;
}
