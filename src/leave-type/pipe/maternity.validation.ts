import { BadRequestException, PipeTransform } from '@nestjs/common';
import { MaternityStatus } from '../enum/Maternity.enum';

export class MaternityValidationPipe implements PipeTransform {
  //   readonly allowedStatus = [
  //     MaternityStatus.ALL,
  //     MaternityStatus.FEMALE,
  //     MaternityStatus.MALE,
  //   ];
  transform(value: any) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is invalid status`);
    }
    return value;
  }
  private isStatusValid(status: any) {
    return Object.values(MaternityStatus).includes(status);
  }
}
