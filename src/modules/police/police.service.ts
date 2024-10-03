import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
import { Police } from 'src/entity/police.entity';
  
  import { Repository } from 'typeorm';
  
  @Injectable()
  export class PoliceService {
    constructor(
      @InjectRepository(Police)
      private readonly repository: Repository<Police>,
    ) {}
  
    async getAllPolices(): Promise<Police[]> {
      try {
        return await this.repository.find();
      } catch (error) {
        throw new InternalServerErrorException('Error retrieving polices.');
      }
    }
    
    /* ------------------------------------------- Helper ------------------------------------------- */
    async findById(id: number): Promise<Police> {
      try {
        const pkg = await this.repository.findOne({
          where: { police_id: id },
        });
        if (!pkg) {
          throw new NotFoundException('Police not found.');
        }
        return pkg;
      } catch (error) {
        throw new InternalServerErrorException(
          'Error retrieving police.',
          error.message,
        );
      }
    }
  
  }
  