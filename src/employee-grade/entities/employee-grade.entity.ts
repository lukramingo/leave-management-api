import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@Entity('employee_grade')
export class EmployeeGrade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ comment: 'Years' })
  tenure: number;

  @Column('decimal', {
    comment: 'No. of leave credits to add each month',
    precision: 11,
    scale: 2,
  })
  leave_balance_per_month: number;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column('timestamp', { nullable: true })
  updated_at: Date | null;

  @Column({ length: 1, default: '1' })
  is_active: string;

  // @OneToMany(() => Employee, (employee) => employee.employeeGrade)
  // employees: Employee[];
}
