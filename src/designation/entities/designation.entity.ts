import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@Entity('designation')
export class Designation {
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

  @Column({ length: 1, default: '1' })
  is_active: string;

  // @OneToMany(() => Employee, (employee) => employee.designation)
  // employees: Employee[];
}
