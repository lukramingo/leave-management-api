import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CreditTenure } from '../enum/Credit.enum';
export class CreditValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is invalid status`);
    }

    return value;
  }
  private isStatusValid(status: any) {
    return Object.values(CreditTenure).includes(status);
  }
}
