import { Module } from '@nestjs/common';
import { LeaveRecordService } from './leave-record.service';
import { LeaveRecordController } from './leave-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRecord } from './entities/leave-record.entity';
import { AuthModule } from '../auth/auth.module';
import { Employee } from '../employee/entities/employee.entity';
import { StatusColor } from './entities/color.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeaveRecord, Employee, StatusColor]),
    AuthModule,
  ],
  controllers: [LeaveRecordController],
  providers: [LeaveRecordService],
})
export class LeaveRecordModule {}
