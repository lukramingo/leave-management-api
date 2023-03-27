import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { AuthRole } from '../../auth/entities/auth-role.entity';

@Entity('role_leave_approval')
export class RoleLeaveApproval {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  auth_role_id: number;

  @Column()
  max_approvable_leave: number;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updated_at: Date | null;

  @Column({ length: 1, default: '1' })
  is_active: string;

  // @ManyToOne(() => AuthRole, (authRole) => authRole.roleLeaveApprovals)
  // @JoinColumn({ name: 'auth_role_id'})
  // authRole: AuthRole;
}
