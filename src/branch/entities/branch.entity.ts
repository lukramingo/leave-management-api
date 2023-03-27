import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@Entity('branch')
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column('timestamp', { nullable: true })
  updated_at: Date | null;

  @Column('char', { length: 1, default: '1' })
  is_active: string;

  // @OneToMany(() => Employee, (employee) => employee.branch)
  // employees: Employee[];
}
