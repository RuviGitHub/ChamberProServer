import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chamber } from 'src/entity/chamber.entity';
import { RegisterChamberDTO } from 'src/dto/chamber/register-chamber.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ChamberService {
  constructor(
    @InjectRepository(Chamber)
    private readonly repository: Repository<Chamber>,
    private readonly userService: UserService,
  ) {}

  /**
   * Registers a new chamber.
   * @param dto - The RegisterChamberDTO object containing chamber details.
   * @returns The newly created chamber entity.
   * @throws BadRequestException if the chamber name already exists.
   * @throws InternalServerErrorException on unexpected errors.
   */
  async registerChamber(dto: RegisterChamberDTO): Promise<Chamber> {
    try {
      // Check if the chamber name already exists
      const existingChamber = await this.findByName(dto.chamber_name);

      if (existingChamber) {
        throw new BadRequestException('Chamber name already exists.');
      }

      // Create and save the new chamber
      const chamber = this.repository.create({
        ...dto,
        chamber_subscription_start_date: new Date(), 
        chamber_subscription_end_date: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ), // Set to 30 days from now
        status: 1,
        is_active: true,
      });

      const createdChamber = await this.repository.save(chamber);

      // update user entity with chamber_id
      await this.userService.updateByFilters(
        { user_id: dto.user_id },
        { chamber_id: createdChamber.chamber_id },
      );
      return createdChamber;
    } catch (error) {
      console.error('Error registering chamber:', error.message);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error registering chamber.');
    }
  }

  async findByName(name: string): Promise<Chamber | null> {
    return await this.repository.findOne({ where: { chamber_name: name } });
  }

  async findById(id: number): Promise<Chamber> {
    return await this.repository.findOne({ where: { chamber_id: id } });
  }
}
