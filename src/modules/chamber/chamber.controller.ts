import { Body, Controller, Post, Res } from '@nestjs/common';
import { ResponseService } from 'src/utils/response.service';
import { RegisterUserDTO } from 'src/dto/user/register-user.dto';
import { VerifyOtpDTO } from 'src/dto/user/verify-otp.dto';
import { ChamberService } from './chamber.service';
import { RegisterChamberDTO } from 'src/dto/chamber/register-chamber.dto';

@Controller('chamber')
export class ChamberController{
  constructor(
    private readonly service: ChamberService,
    private readonly response: ResponseService,
  ) {}

  @Post('/register-chamber')
  async registerChamber(@Body() dto: RegisterChamberDTO, @Res() res) {
    const chamber = await this.service.registerChamber(dto);
    return this.response.sendSuccessResponse(
      res,
      'Chamber registered.',
      chamber,
    );
  }

//   @Post('verify-otp')
//   async verifyOtp(@Body() dto: VerifyOtpDTO, @Res() res) {
//     const flag = await this.service.verifyOtp(dto);
//     if (flag) {
//       return this.response.sendSuccessResponse(res, 'Otp Verified.');
//     }
//     return this.response.sendSuccessResponse(res, 'Invalid Otp.');
//   }
}
