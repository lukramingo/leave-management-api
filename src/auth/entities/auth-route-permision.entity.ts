// import {
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { AuthPermission } from './auth-permision.entity';

// @Entity('auth_route_permission')
// export class AuthRoutePermission {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column('varchar', { name: 'route', length: 255 })
//   route: string;

//   @Column()
//   auth_permission_id: number;

//   @ManyToOne(
//     () => AuthPermission,
//     (authPermission) => authPermission.authRoutePermissions,
//   )
//   @JoinColumn([{ name: 'auth_permission_id' }])
//   authPermission: AuthPermission;
// }
