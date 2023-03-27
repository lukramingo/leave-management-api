import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { AuthRole } from './auth-role.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { OtpStore } from './auth-otp.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true, length: 255 })
  username: string;

  @Column('varchar', {
    nullable: true,
    unique: true,
    length: 255,
  })
  email: string | null;

  @Column('smallint', {
    comment: '0-inactive, 10-active',
    default: 10,
  })
  status: number;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column('timestamp', { nullable: true })
  updated_at: Date | null;

  @Column('varchar', { nullable: true, length: 255 })
  note_token: string | null;

  @OneToMany(() => OtpStore, (otpStore) => otpStore.user)
  otpStores: OtpStore[];

  @OneToOne(() => Employee, (employee) => employee.user)
  employee: Employee;

  // @ManyToMany(() => AuthRole, (authRole) => authRole.users)
  // authRoles: AuthRole[];
}
