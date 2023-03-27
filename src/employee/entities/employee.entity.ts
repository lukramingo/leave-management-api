import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/auth-user.entity';
import { Branch } from '../../branch/entities/branch.entity';
import { Department } from '../../department/entities/department.entity';
import { Designation } from '../../designation/entities/designation.entity';
import { EmployeeGrade } from '../../employee-grade/entities/employee-grade.entity';
import { LeaveApprovalLog } from '../../leave-approval-log/entities/leave-approval-log.entity';
import { LeaveBalance } from '../../leave-balance/entities/leave-balance.entity';
import { LeaveRecord } from '../../leave-record/entities/leave-record.entity';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  branch_id: number;

  @Column()
  department_id: number;

  @Column()
  designation_id: number;

  @Column('date')
  date_of_joining: Date;

  @Column({ nullable: true })
  photo: string | null;

  @Column({ length: 10 })
  phone: string;

  @Column()
  employee_grade_id: number;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column('timestamp', { nullable: true })
  updated_at: Date | null;

  @Column({ length: 1, default: '1' })
  is_active: string;

  @OneToOne(() => User, (user) => user.employee)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @Column()
  user_id: number;

  @OneToMany(() => LeaveBalance, (leaveBalance) => leaveBalance.employee)
  leaveBalances: LeaveBalance[];

  @OneToMany(() => LeaveRecord, (leaveRecord) => leaveRecord.employee)
  leaveRecords: LeaveRecord[];

  // @ManyToOne(() => Branch, (branch) => branch.employees)
  // @JoinColumn()
  // branch: Branch;

  // @ManyToOne(() => Department, (department) => department.employees)
  // @JoinColumn()
  // department: Department;

  // @ManyToOne(() => Designation, (designation) => designation.employees)
  // @JoinColumn()
  // designation: Designation;

  // @ManyToOne(() => EmployeeGrade, (employeeGrade) => employeeGrade.employees)
  // @JoinColumn()
  // employeeGrade: EmployeeGrade;

  // @OneToMany(
  //   () => LeaveApprovalLog,
  //   (leaveApprovalLog) => leaveApprovalLog.approvedByEmployee,
  // )
  // leaveApprovalLogs: LeaveApprovalLog[];

  // @OneToMany(() => LeaveRecord, (leaveRecord) => leaveRecord.approvedByEmployee)
  // leaveRecords2: LeaveRecord[];
}
