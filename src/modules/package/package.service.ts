import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from 'src/entity/package.entity';

import { Repository } from 'typeorm';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private readonly repository: Repository<Package>,
  ) {}

  /* ------------------------------------------- Helper ------------------------------------------- */
  async findById(id: number): Promise<Package> {
    try {
      const pkg = await this.repository.findOne({
        where: { package_id: id },
      });
      if (!pkg) {
        throw new NotFoundException('Package not found.');
      }
      return pkg;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving package.',
        error.message,
      );
    }
  }

  async getAllPackages(): Promise<Package[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving packages.');
    }
  }
}
