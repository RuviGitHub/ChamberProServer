import { Body, Controller, Get, ParseIntPipe, Post, Query, Res } from '@nestjs/common';
import { ResponseService } from 'src/utils/response.service';
import { StatusChangeDTO } from 'src/dto/common/status-change.dto';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDTO } from 'src/dto/appointment/create-appointment.dto';
import { PaginationAppointmentQueryDTO } from 'src/dto/appointment/paginated-query.dto';
import { PaginatedAppointmentDTO } from 'src/dto/appointment/paginated-appointment.dto';
import { UpdateAppointmentDTO } from 'src/dto/appointment/update-appointment.dto';



@Controller('appointment')
export class AppointmentController {
  constructor(
    private readonly service: AppointmentService,
    private readonly response: ResponseService,
  ) {}

  @Post('create-appointment')
  async registerAppointment(@Body() dto: CreateAppointmentDTO, @Res() res) {
    const appointment = await this.service.registerAppointment(dto);
    return this.response.sendSuccessResponse(res, 'Appointment registered.', appointment);
  }


  @Get()
  async viewAppointment(@Query('id', ParseIntPipe) id: number, @Res() res) {
    const appointment = await this.service.viewAppointment(id);
    return this.response.sendSuccessResponse(res, 'Appointments retrieved.', appointment);
  }

  @Get('all-paginated')
  async getAllAppointments(@Query() query: PaginationAppointmentQueryDTO, @Res() res) {
    const result: PaginatedAppointmentDTO =
      await this.service.getAppointmentsPaginated(query);
    return this.response.sendSuccessResponse(res, 'Appointments retrieved.', result);
  }

  @Post('status-change')
  async changeStatus(@Body() dto: StatusChangeDTO, @Res() res) {
    const Appointment = await this.service.changeStatus(dto);
    return this.response.sendSuccessResponse(res,'Appointments status changed.',Appointment);
  }

  @Post('update-Appointment')
  async updateAppointment(@Body() dto: UpdateAppointmentDTO,@Res() res,) {
    const updatedAppointment = await this.service.updateAppointment(dto);
    return this.response.sendSuccessResponse(res, 'Appointment updated successfully.', updatedAppointment);
  }
}
