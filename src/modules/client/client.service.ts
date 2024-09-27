import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDTO } from 'src/dto/client/create-client.dto';
import { Client } from 'src/entity/client.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { PaginationQueryDTO } from '../../dto/client/paginated-query.dto';
import { PaginatedClientDTO } from '../../dto/client/paginated-client.dto';
import { StatusChangeDTO } from 'src/dto/common/status-change.dto';
import { UpdateClientDTO } from 'src/dto/client/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
  ) {}

  /**
   * Registers a new client.
   * @param dto - The CreateClientDTO object containing client details.
   * @returns The newly created client.
   * @throws NotFoundException if a client with the same name already exists.
   * @throws InternalServerErrorException on unexpected errors.
   */
  async registerClient(dto: CreateClientDTO) {
    try {
      const existingEntity = await this.findByName(dto.client_name);

      if (existingEntity) {
        throw new NotFoundException('Client name already exists.');
      }

      const client = this.repository.create({
        ...dto,
        status: 1,
        is_active: true,
      });

      return await this.repository.save(client);
    } catch (error) {
      console.error('Error registering client:', error.message);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error registering client.');
    }
  }

  /**
   * Retrieves a paginated list of clients based on the provided query parameters.
   * @param paginationQuery - The PaginationQueryDTO object containing pagination and filter options.
   * @returns A paginated response containing the list of clients and total count.
   * @throws InternalServerErrorException on unexpected errors.
   */
  async getClientsPaginated(
    paginationQuery: PaginationQueryDTO,
    chamber_id: number,
  ): Promise<PaginatedClientDTO> {
    try {
      const {
        page = 1,
        perPage = 10,
        order = 1,
        search,
        status,
        district,
      } = paginationQuery;

      // Determine the sort direction
      const orderDirection: 'ASC' | 'DESC' = order === 1 ? 'ASC' : 'DESC';

      // Build where conditions for querying clients
      const whereConditions: FindOptionsWhere<Client> = {
        chamber_id,
        ...(search && { client_name: Like(`%${search}%`) }),
        ...(status && { status }),
        ...(district && { client_district_id: Number(district) }),
      };

      // Query the clients with pagination and filtering
      const [clients, total] = await this.repository.findAndCount({
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
        clients,
      };
    } catch (error) {
      console.error('Error retrieving clients:', error);
      throw new InternalServerErrorException('Error retrieving clients.');
    }
  }

  async viewClient(id: number): Promise<Client> {
    try {
      const client = await this.findById(id);
      
      if (!client) {
        throw new NotFoundException('Client not found.');
      }
      return client;
    } catch (error) {
      console.error('Error changing client status:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error changing client status.');
    }
  }

  /**
   * Updates the status of an existing client.
   * @param dto - The StatusChangeDTO object containing the client ID and new status.
   * @returns The updated client.
   * @throws NotFoundException if the client with the given ID is not found.
   * @throws InternalServerErrorException on unexpected errors.
   */
  async changeStatus(dto: StatusChangeDTO): Promise<Client> {
    try {
      const client = await this.findById(dto.id);
      if (!client) {
        throw new NotFoundException('Client not found.');
      }
      // Update the client's status and timestamp
      client.status = dto.status;
      client.updated_at = new Date();

      // Save the updated client to the database
      return await this.repository.save(client);
    } catch (error) {
      console.error('Error changing client status:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error changing client status.');
    }
  }

  /**
   * Updates an existing client's information.
   * @param id - The ID of the client to update.
   * @param dto - The data to update the client with.
   * @returns The updated client.
   * @throws NotFoundException if the client is not found.
   * @throws InternalServerErrorException on unexpected errors.
   */
  async updateClient(dto: UpdateClientDTO): Promise<Client> {
    try {
      const client = await this.findById(dto.client_id);

      if (!client) {
        throw new NotFoundException('Client not found.');
      }

      // Update the client with new data
      this.repository.merge(client, dto);
      client.updated_at = new Date();

      return await this.repository.save(client);
    } catch (error) {
      console.error('Error updating client:', error.message);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating client.');
    }
  }

  // Methods for finding clients by name or ID (not shown)
  async findByName(client_name: string): Promise<Client | null> {
    return await this.repository.findOne({ where: { client_name } });
  }

  async findById(id: number): Promise<Client | null> {
    return await this.repository.findOne({ where: { client_id: id } });
  }
}
