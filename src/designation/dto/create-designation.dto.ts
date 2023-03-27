import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDesignationDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  name: string;
}
