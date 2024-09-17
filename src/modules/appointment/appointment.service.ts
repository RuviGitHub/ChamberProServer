import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Appointment } from 'src/entity/Appointment.entity';
  import { FindOptionsWhere, Like, Repository } from 'typeorm';
  import { StatusChangeDTO } from 'src/dto/common/status-change.dto';
import { CreateAppointmentDTO } from 'src/dto/appointment/create-appointment.dto';
import { PaginationAppointmentQueryDTO } from 'src/dto/appointment/paginated-query.dto';
import { PaginatedAppointmentDTO } from 'src/dto/appointment/paginated-appointment.dto';
import { UpdateAppointmentDTO } from 'src/dto/appointment/update-appointment.dto';

  
  @Injectable()
  export class AppointmentService {
    constructor(
      @InjectRepository(Appointment)
      private readonly repository: Repository<Appointment>,
    ) {}

    async registerAppointment(dto: CreateAppointmentDTO) {
      try {
       
        const appointment = this.repository.create({
          ...dto,
          status: 1,
          is_active: true,
        });
  
        return await this.repository.save(appointment);
      } catch (error) {
        console.error('Error registering appointment:', error.message);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error registering appointment.');
      }
    }
   
    async getAppointmentsPaginated(paginationQuery: PaginationAppointmentQueryDTO,): Promise<PaginatedAppointmentDTO> {
      try {
        const {
          page = 1,
          perPage = 10,
          order = 1,
          search,
          status,
          client_id,
          case_id,
          date
        } = paginationQuery;
  
        // Determine the sort direction
        const orderDirection: 'ASC' | 'DESC' = order === 1 ? 'ASC' : 'DESC';
  
        // Build where conditions for querying Appointments
        const whereConditions: FindOptionsWhere<Appointment> = {
          ...(search && { Appointment_no: Like(`%${search}%`) }),
          ...(status && { status }),
          ...(client_id && { client_id: Number(client_id) }),
          ...(case_id && { case_id: Number(case_id) }),
          ...(date && { date: date }),
        };
  
        // Query the Appointments with pagination and filtering
        const [appointments, total] = await this.repository.findAndCount({
          where: whereConditions,
          order: {
            created_at: orderDirection,
          },
          skip: (page - 1) * perPage,
          take: perPage,
        });
  
        return {
          page,
          perPage,
          total,
          appointments,
        };
      } catch (error) {
        console.error('Error retrieving appointments:', error);
        throw new InternalServerErrorException('Error retrieving appointments.');
      }
    }
  
    async viewAppointment(id: number): Promise<Appointment> {
      try {
        const appointment = await this.findById(id);
        
        if (!appointment) {
          throw new NotFoundException('Appointment not found.');
        }
        return appointment;
      } catch (error) {
        console.error('Error changing appointment status:', error);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error changing appointment status.');
      }
    }
   
    async changeStatus(dto: StatusChangeDTO): Promise<Appointment> {
      try {
        const appointment = await this.findById(dto.id);
        if (!appointment) {
          throw new NotFoundException('Appointment not found.');
        }
        // Update the Appointment's status and timestamp
        appointment.status = dto.status;
        appointment.updated_at = new Date();
  
        // Save the updated Appointment to the database
        return await this.repository.save(appointment);
      } catch (error) {
        console.error('Error changing appointment status:', error);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error changing appointment status.');
      }
    }
   
    async updateAppointment(dto: UpdateAppointmentDTO): Promise<Appointment> {
      try {
        const appointment = await this.findById(dto.appointment_id);
  
        if (!appointment) {
          throw new NotFoundException('Appointment not found.');
        }
  
        // Update the Appointment with new data
        this.repository.merge(appointment, dto);
        appointment.updated_at = new Date();
  
        return await this.repository.save(appointment);
      } catch (error) {
        console.error('Error updating Appointment:', error.message);
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new InternalServerErrorException('Error updating appointment.');
      }
    }
  
    async findById(id: number): Promise<Appointment | null> {
      return await this.repository.findOne({ where: { appointment_id: id } });
    }
  }
  