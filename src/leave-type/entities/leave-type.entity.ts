import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreditTenure } from '../enum/Credit.enum';
import { MaternityStatus } from '../enum/Maternity.enum';
import { LeaveBalance } from '../../leave-balance/entities/leave-balance.entity';
import { LeaveRecord } from '../../leave-record/entities/leave-record.entity';

@Entity('leave_type')
export class LeaveType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string | null;

  @Column({
    comment:
      'Minimum no. of days before the leave date that the employee has to apply',
  })
  minimum_days_before: number;

  @Column('decimal', {
    comment: 'How much leave balance (credit) to award to employee',
    precision: 10,
    scale: 2,
  })
  credit: number;

  @Column({
    type: 'enum',
    comment: 'Credit leave balance every month/quarterly/bi-annual/yearly',
    enum: CreditTenure,
  })
  credit_tenure: CreditTenure;

  @Column({
    type: 'enum',
    comment: 'Eg. Maternity is for females, paternity is for males',
    enum: MaternityStatus,
    default: MaternityStatus.ALL,
  })
  apply_to_gender: MaternityStatus;

  @Column('tinyint', {
    comment:
      'Minimum no. of years the employee has to work in the organization to be eligible for this leave. Eg.: Earned leave',
    default: 0,
  })
  minimum_job_tenure: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date | null;

  @Column({ length: 1, default: '1' })
  is_active: string;

  @Column({ nullable: true })
  icon: string;

  @OneToMany(() => LeaveBalance, (leaveBalance) => leaveBalance.leaveType)
  leaveBalances: LeaveBalance[];

  // @OneToMany(() => LeaveRecord, (leaveRecord) => leaveRecord.leaveType)
  // leaveRecords: LeaveRecord[];
}
