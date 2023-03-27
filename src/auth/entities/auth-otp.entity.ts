import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './auth-user.entity';

@Entity('otp_store')
export class OtpStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  otp: string;

  @Column({ length: 1, default: '0' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.otpStores)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;
}
