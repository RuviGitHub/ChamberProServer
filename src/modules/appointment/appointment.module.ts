import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/entity/appointment.entity';
import { ResponseService } from 'src/utils/response.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [AppointmentController],
  providers: [AppointmentService, ResponseService],
  exports: [TypeOrmModule]
})
export class AppointmentModule {}
