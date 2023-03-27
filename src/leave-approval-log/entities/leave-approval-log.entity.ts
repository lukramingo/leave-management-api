import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';
import { LeaveRecord } from '../../leave-record/entities/leave-record.entity';

@Entity('leave_approval_log')
export class LeaveApprovalLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  leave_record_id: number;

  @Column({
    comment:
      '1-Pending; 2-Approved; 3-Approved without pay; 4-Rejected; 5-Cancelled;',
    length: 1,
  })
  approval_status: string;

  @Column()
  approved_by_employee_id: number;

  @Column({ nullable: true })
  remark: string | null;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({ length: 1, default: '1' })
  is_active: string;

  // @ManyToOne(() => Employee, (employee) => employee.leaveApprovalLogs)
  // @JoinColumn({ name: 'approved_by_employee_id'})
  // approvedByEmployee: Employee;

  // @ManyToOne(() => LeaveRecord, (leaveRecord) => leaveRecord.leaveApprovalLogs)
  // @JoinColumn({ name: 'leave_record_id' })
  // leaveRecord: LeaveRecord;
}
