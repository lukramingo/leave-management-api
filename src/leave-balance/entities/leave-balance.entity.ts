import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Employee } from '../../employee/entities/employee.entity';
import { LeaveType } from '../../leave-type/entities/leave-type.entity';

@Entity('leave_balance')
export class LeaveBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column('timestamp', { nullable: true })
  updated_at: Date | null;

  @Column('char', { length: 1, default: '1' })
  is_active: string;

  @ManyToOne(() => Employee, (employee) => employee.leaveBalances)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column()
  employee_id: number;

  @ManyToOne(() => LeaveType, (leaveType) => leaveType.leaveBalances)
  @JoinColumn({ name: 'leave_type_id' })
  leaveType: LeaveType;

  @Column()
  leave_type_id: number;
}
