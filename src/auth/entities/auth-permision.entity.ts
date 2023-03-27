// import {
//   Column,
//   Entity,
//   JoinTable,
//   ManyToMany,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// // import { AuthRole } from './auth-role.entity';
// import { AuthRoutePermission } from './auth-route-permision.entity';

// @Entity('auth_permission')
// export class AuthPermission {
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

//   @ManyToMany(() => AuthRole, (authRole) => authRole.authPermissions)
//   @JoinTable({
//     name: 'auth_role_permission',
//     joinColumns: [{ name: 'auth_permission_id', referencedColumnName: 'id' }],
//     inverseJoinColumns: [{ name: 'auth_role_id', referencedColumnName: 'id' }],
//     schema: 'leave_management_db',
//   })
//   authRoles: AuthRole[];

//   @OneToMany(
//     () => AuthRoutePermission,
//     (authRoutePermission) => authRoutePermission.authPermission,
//   )
//   authRoutePermissions: AuthRoutePermission[];
// }
