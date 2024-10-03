import { Body, Controller, Post, Res } from '@nestjs/common';
import { OtpService } from './otp.service';
import { GenerateOtpDto } from 'src/dto/otp/generate-otp.dto';
import { VerifyOtpDto } from 'src/dto/otp/verify-otp.dto';
import { ResponseService } from 'src/utils/response.service';

@Controller('otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly responseService: ResponseService, 
  ) {}

  @Post('generate-otp')
  async generateOtp(@Body() generateOtpDto: GenerateOtpDto, @Res() res) {
    const result = await this.otpService.generateOtp(generateOtpDto);
    return this.responseService.sendSuccessResponse(res, 'OTP generated.', result);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto, @Res() res) {
    const result = await this.otpService.verifyOtp(verifyOtpDto);
    return this.responseService.sendSuccessResponse(res, 'OTP verified.', result);
  }
}
