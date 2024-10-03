import { Controller, Get, Res } from '@nestjs/common';
import { ResponseService } from 'src/utils/response.service';
import { PoliceService } from './police.service';

@Controller('police')
export class PoliceController {
  constructor(
    private readonly service: PoliceService,
    private readonly responseService: ResponseService,
  ) {}

  @Get()
  async getAllPolice(@Res() res) {
    const polices = await this.service.getAllPolices();
    return this.responseService.sendSuccessResponse(
      res,
      'Police retrieved.',
      polices,
    );
  }
}
