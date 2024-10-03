import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ResponseService } from 'src/utils/response.service';
import { RegisterUserDTO } from 'src/dto/user/register-user.dto';
import { VerifyOtpDTO } from 'src/dto/user/verify-otp.dto';
import { ChamberService } from './chamber.service';
import { RegisterChamberDTO } from 'src/dto/chamber/register-chamber.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('chamber')
export class ChamberController{
  constructor(
    private readonly service: ChamberService,
    private readonly response: ResponseService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/register-chamber')
  async registerChamber(@Body() dto: RegisterChamberDTO, @Res() res) {
    const chamber = await this.service.registerChamber(dto);
    return this.response.sendSuccessResponse(
      res,
      'Chamber registered.',
      chamber,
    );
  }
}
