// import {
//   Column,
//   Entity,
//   JoinTable,
//   ManyToMany,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { AuthPermission } from './auth-permision.entity';
// import { User } from './auth-user.entity';
// import { RoleLeaveApproval } from 'src/role-leave-approval/entities/role-leave-approval.entity';

// @Entity('auth_role')
// export class AuthRole {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column('varchar', { name: 'name', length: 255 })
//   name: string;

//   @Column('varchar', { name: 'description', nullable: true, length: 255 })
//   description: string | null;

//   @Column('timestamp', {
//     name: 'created_at',
//     default: () => 'CURRENT_TIMESTAMP',
//   })
//   createdAt: Date;

//   @Column('timestamp', {
//     name: 'updated_at',
//     default: () => 'CURRENT_TIMESTAMP',
//   })
//   updatedAt: Date;

//   @ManyToMany(
//     () => AuthPermission,
//     (authPermission) => authPermission.authRoles,
//   )
//   authPermissions: AuthPermission[];

//   @ManyToMany(() => User, (user) => user.authRoles)
//   @JoinTable({
//     name: 'auth_user_role',
//     joinColumns: [{ name: 'auth_role_id', referencedColumnName: 'id' }],
//     inverseJoinColumns: [{ name: 'user_id', referencedColumnName: 'id' }],
//     schema: 'leave_management_db',
//   })
//   users: User[];

//   @OneToMany(
//     () => RoleLeaveApproval,
//     (roleLeaveApproval) => roleLeaveApproval.authRole,
//   )
//   roleLeaveApprovals: RoleLeaveApproval[];
// }
