import { Controller, Get, Res } from '@nestjs/common';
import { ResponseService } from './utils/response.service';

@Controller()
export class AppController {
  constructor(private readonly responseService: ResponseService) {}

  @Get('server-health-check')
  async serverHealthCheck(@Res() res) {
    return this.responseService.sendSuccessResponse(
      res,
      'Server is up & running.',
    );
  }
}
