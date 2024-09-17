import { Appointment } from 'src/entity/appointment.entity';

export class PaginatedAppointmentDTO {
  page: number;
  perPage: number;
  total: number;
  appointments: Appointment[];
}
