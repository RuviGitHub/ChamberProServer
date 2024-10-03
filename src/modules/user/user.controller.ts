import { BadRequestException, Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseService } from 'src/utils/response.service';
import { RegisterUserDTO } from 'src/dto/user/register-user.dto';
import { VerifyOtpDTO } from 'src/dto/user/verify-otp.dto';
import { SetupPasswordDTO } from 'src/dto/user/setup-password.dto';
import { JwtService } from 'src/auth/jwt.service';
import { LoginDTO } from 'src/dto/user/login.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly response: ResponseService,
    private readonly jwtService: JwtService
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDTO, @Res() res) {
    const user = await this.service.validateUser(dto);

    if (!user) {
      throw new BadRequestException('Invalid credentials.');
    }

    const payload = { user_id: user.user_id };
    const token = this.jwtService.sign(payload);

    // Store the token in the user model encrypted
    await this.service.storeToken(user.user_id, token);

    return this.response.sendSuccessResponse(res, 'Login successful.', { token:token, user_id: user.user_id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth')
  async auth(@Res() res: any, @Req() req: any) {
    const { user_id } = req.user;
    const user = await this.service.auth(user_id);
    return this.response.sendSuccessResponse(res, 'Auth successful.', user);
  }

  @Post('register-user')
  async registerUser(@Body() dto: RegisterUserDTO, @Res() res) {
    const user = await this.service.registerUser(dto);
    return this.response.sendSuccessResponse(res, 'User registered.', user);
  }

  // @Post('setup-password')
  // async setupPassword(@Body() dto: SetupPasswordDTO, @Res() res) {
  //   const user = await this.service.setupPassword(dto);
  //   return this.response.sendSuccessResponse(res, 'Password updated.', user);
  // }
}
