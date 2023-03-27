import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BranchModule } from './branch/branch.module';
import { DepartmentModule } from './department/department.module';
import { DesignationModule } from './designation/designation.module';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeGradeModule } from './employee-grade/employee-grade.module';
import { LeaveApprovalLogModule } from './leave-approval-log/leave-approval-log.module';
import { LeaveBalanceModule } from './leave-balance/leave-balance.module';
import { LeaveRecordModule } from './leave-record/leave-record.module';
import { LeaveTypeModule } from './leave-type/leave-type.module';
import { RoleLeaveApprovalModule } from './role-leave-approval/role-leave-approval.module';
import { Branch } from './branch/entities/branch.entity';
import { Department } from './department/entities/department.entity';
import { Designation } from './designation/entities/designation.entity';
import { Employee } from './employee/entities/employee.entity';
import { LeaveType } from './leave-type/entities/leave-type.entity';
import { EmployeeGrade } from './employee-grade/entities/employee-grade.entity';
import { LeaveBalance } from './leave-balance/entities/leave-balance.entity';
import { User } from './auth/entities/auth-user.entity';
import { OtpStore } from './auth/entities/auth-otp.entity';
import { LeaveRecord } from './leave-record/entities/leave-record.entity';
import { PassportModule } from '@nestjs/passport';
import { LeaveApprovalLog } from './leave-approval-log/entities/leave-approval-log.entity';
import { StatusColor } from './leave-record/entities/color.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Nature@2022',
      database: 'leave_management_db',
      entities: [
        // Branch,
        // Department,
        // Designation,
        Employee,
        // EmployeeGrade,
        LeaveType,
        LeaveBalance,
        LeaveRecord,
        LeaveApprovalLog,
        User,
        OtpStore,
        StatusColor,
      ],
      synchronize: true,
    }),
    AuthModule,
    BranchModule,
    DepartmentModule,
    DesignationModule,
    EmployeeModule,
    EmployeeGradeModule,
    LeaveApprovalLogModule,
    LeaveBalanceModule,
    LeaveRecordModule,
    LeaveTypeModule,
    RoleLeaveApprovalModule,
    PassportModule,
  ],
})
export class AppModule {}
