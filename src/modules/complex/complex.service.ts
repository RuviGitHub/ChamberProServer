import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Complex } from 'src/entity/complex.entity';
  
  @Injectable()
  export class ComplexService {
    constructor(
      @InjectRepository(Complex)
      private readonly repository: Repository<Complex>,
    ) {}
  
    // Retrieve all complexes
    async getAllComplexes(): Promise<Complex[]> {
      try {
        return await this.repository.find();
      } catch (error) {
        throw new InternalServerErrorException('Error retrieving complexes.');
      }
    }
  
    // Retrieve a specific complex by ID
    async findById(id: number): Promise<Complex> {
      try {
        const complex = await this.repository.findOne({ where: { complex_id: id } });
        if (!complex) {
          throw new NotFoundException('Complex not found.');
        }
        return complex;
      } catch (error) {
        throw new InternalServerErrorException('Error retrieving complex.');
      }
    }
  
    // Create or update a complex
    async saveComplex(complexData: Partial<Complex>): Promise<Complex> {
      try {
        const complex = this.repository.create(complexData);
        return await this.repository.save(complex);
      } catch (error) {
        throw new InternalServerErrorException('Error saving complex.');
      }
    }
  
    // Deactivate a complex
    async deactivateComplex(id: number): Promise<Complex> {
      try {
        const complex = await this.findById(id);
        complex.status = 2; // Set status to deactivated (2)
        complex.is_active = false;
        return await this.repository.save(complex);
      } catch (error) {
        throw new InternalServerErrorException('Error deactivating complex.');
      }
    }
  }
  