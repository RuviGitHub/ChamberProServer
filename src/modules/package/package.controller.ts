import { Controller, Get, Res } from '@nestjs/common';
import { ResponseService } from 'src/utils/response.service';
import { PackageService } from './package.service';

@Controller('package')
export class PackageController {
  constructor(
    private readonly service: PackageService,
    private readonly responseService: ResponseService,
  ) {}

  @Get()
  async getAllPolice(@Res() res) {
    const pkgs = await this.service.getAllPackages();
    return this.responseService.sendSuccessResponse(
      res,
      'Packages retrieved.',
      pkgs,
    );
  }
}
