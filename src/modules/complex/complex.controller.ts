import { Controller, Get, Param, Post, Body, Res, Put, Query } from '@nestjs/common';
import { ComplexService } from './complex.service';
import { ResponseService } from 'src/utils/response.service';
import { Complex } from 'src/entity/complex.entity';

@Controller('complex')
export class ComplexController {
  constructor(
    private readonly service: ComplexService,
    private readonly responseService: ResponseService,
  ) {}

  // Endpoint to retrieve all complexes
  @Get()
  async getAllComplexes(@Res() res) {
    const complexes = await this.service.getAllComplexes();
    return this.responseService.sendSuccessResponse(res, 'Complexes retrieved.', complexes);
  }

  // Endpoint to retrieve a specific complex by ID
  @Get(':id')
  async getComplexById(@Param('id') id: number, @Res() res) {
    const complex = await this.service.findById(id);
    return this.responseService.sendSuccessResponse(res, 'Complex retrieved.', complex);
  }

  // Endpoint to create or update a complex
  @Post('save')
  async saveComplex(@Body() complexData: Partial<Complex>, @Res() res) {
    const complex = await this.service.saveComplex(complexData);
    return this.responseService.sendSuccessResponse(res, 'Complex saved successfully.', complex);
  }

  // Endpoint to deactivate a complex by ID
  @Put('deactivate/:id')
  async deactivateComplex(@Param('id') id: number, @Res() res) {
    const complex = await this.service.deactivateComplex(id);
    return this.responseService.sendSuccessResponse(res, 'Complex deactivated successfully.', complex);
  }
}
