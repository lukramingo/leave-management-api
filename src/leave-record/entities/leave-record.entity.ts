import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { LeaveApprovalLog } from '../../leave-approval-log/entities/leave-approval-log.entity';
import { Employee } from '../../employee/entities/employee.entity';
// import { LeaveType } from '../../leave-type/entities/leave-type.entity';

@Entity('leave_record')
export class LeaveRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employee_id: number;

  @Column()
  leave_type_id: number;

  @Column('date')
  from_date: string;

  @Column('date')
  to_date: string;

  @Column('decimal', { precision: 11, scale: 2 })
  no_of_days: number;

  @Column()
  reason_for_leave: string;

  @Column('timestamp', { nullable: true })
  approval_date: Date | null;

  @Column({
    comment:
      '1-Pending; 2-Approved; 3-Approved without pay; 4-Rejected; 5-Cancelled;',
    length: 1,
    default: '1',
  })
  approval_status: string;

  @Column({ nullable: true })
  approved_by_employee_id: number | null;

  @Column({ nullable: true })
  remark: string | null;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column('timestamp', { nullable: true })
  updated_at: Date | null;

  @Column({ length: 1, default: '1' })
  is_active: string;

  @ManyToOne(() => Employee, (employee) => employee.leaveRecords)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  // @OneToMany(
  //   () => LeaveApprovalLog,
  //   (leaveApprovalLog) => leaveApprovalLog.leaveRecord,
  // )
  // leaveApprovalLogs: LeaveApprovalLog[];

  // @ManyToOne(() => LeaveType, (leaveType) => leaveType.leaveRecords)
  // @JoinColumn({ name: 'leave_type_id'})
  // leaveType: LeaveType;

  // @ManyToOne(() => Employee, (employee) => employee.leaveRecords2)
  // @JoinColumn({ name: 'approved_by_employee_id'})
  // approvedByEmployee: Employee;
}
