import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDTO } from 'src/dto/user/register-user.dto';
import { SetupPasswordDTO } from 'src/dto/user/setup-password.dto';
import { VerifyOtpDTO } from 'src/dto/user/verify-otp.dto';
import { User } from 'src/entity/user.entity';
import { MailService } from 'src/utils/mail.service';
import { OtpService } from 'src/utils/otp.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from 'src/auth/jwt.service';
import { LoginDTO } from 'src/dto/user/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly otpService: OtpService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async auth(user_id: number) {
    try {
      const user = await this.findById(user_id);
      if (!user) {
        throw new BadRequestException('User not found.');
      }
      return user;
    } catch (error) {
      console.error('Error in auth.', error.message);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error in auth.');
    }
  }

  /**
   * Registers a new user and generates an OTP for verification.
   * @param dto - The RegisterUserDTO object containing user details.
   * @returns The newly created user with OTP details.
   * @throws BadRequestException if the phone number or email already exists.
   * @throws InternalServerErrorException on unexpected errors.
   */
  async registerUser(dto: RegisterUserDTO): Promise<User> {
    try {
      // Check if the phone number or email already exists
      const existingPhoneNumber = await this.findByPhoneNumber(
        dto.phone_number,
      );
      const existingEmail = await this.findByEmail(dto.email);

      if (existingPhoneNumber) {
        throw new BadRequestException('Phone number already exists.');
      }
      if (existingEmail) {
        throw new BadRequestException('Email already exists.');
      }

      // Generate OTP for verification
      const otp = await this.otpService.generateOtp();
      const user = this.repository.create({
        ...dto,
        latest_otp: otp,
        is_otp_verified: false,
        is_chamber_owner: true,
        is_first_login: true,
        role_id: 1,
        status: 1,
        is_active: true,
      });

      // Optionally send OTP email for verification
      // await this.mailService.sendOtpEmail(dto.email, otp);

      return await this.repository.save(user);
    } catch (error) {
      console.error('Error registering user:', error.message);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error registering user.');
    }
  }

  /**
   * Verifies the OTP provided by the user.
   * @param dto - The VerifyOtpDTO object containing phone number and OTP.
   * @returns True if the OTP is valid, false otherwise.
   * @throws NotFoundException if the user is not found.
   * @throws InternalServerErrorException on unexpected errors.
   */
  async verifyOtp(dto: VerifyOtpDTO): Promise<boolean> {
    try {
      const user = await this.findByPhoneNumber(dto.phone_number);

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      return user.latest_otp === dto.otp;
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error verifying OTP.');
    }
  }

  /**
   * Sets up or updates the password for a user.
   * @param dto - The SetupPasswordDTO object containing user ID and new password.
   * @returns The updated user entity with the new password.
   * @throws NotFoundException if the user is not found.
   * @throws InternalServerErrorException on unexpected errors.
   */
  async setupPassword(dto: SetupPasswordDTO): Promise<User> {
    try {
      const existingEntity = await this.findById(dto.user_id);

      if (!existingEntity) {
        throw new NotFoundException('User not found.');
      }

      // Hash the new password before saving
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      existingEntity.password = hashedPassword;
      existingEntity.is_otp_verified = true;
      existingEntity.updated_at = new Date(); // Update timestamp

      return await this.repository.save(existingEntity);
    } catch (error) {
      console.error('Error updating user password:', error.message);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating user password.');
    }
  }

  async findById(id: number): Promise<User | null> {
    return await this.repository.findOne({ where: { user_id: id } });
  }

  async findByPhoneNumber(phone_number: string): Promise<User | null> {
    return await this.repository.findOne({ where: { phone_number } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async getAll(): Promise<User[]> {
    return await this.repository.find();
  }

  async validateUser(dto: LoginDTO): Promise<User | null> {
    const user = await this.findByPhoneNumber(dto.phone_number);

    if (user && (await bcrypt.compare(dto.password, user.password))) {
      return user;
    }
    return null;
  }

  async storeToken(userId: number, token: string): Promise<void> {
    try {
      const hashedToken = await bcrypt.hash(token, 10);
      await this.repository.update(userId, {
        token: hashedToken,
      });
    } catch (error) {
      console.error('Error storing token:', error);
      throw new InternalServerErrorException('Error storing token.');
    }
  }

  async validateToken(userId: number, token: string): Promise<boolean> {
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isTokenValid = await bcrypt.compare(token, user.token);

    // Update token expiration time
    await this.storeToken(userId, token);

    return true;
  }

  async resetTokenExpiration(
    userId: number,
    oldToken: string,
  ): Promise<string> {
    try {
      // Find the user
      const user = await this.findById(userId);

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      // Verify the old token
      const isTokenValid = await bcrypt.compare(oldToken, user.token);
      if (!isTokenValid) {
        throw new InternalServerErrorException('Invalid token.');
      }

      // Generate a new token
      const newToken = this.jwtService.sign({
        user_id: user.user_id,
      });

      // Store the new token in the database (encrypted)
      user.token = await bcrypt.hash(newToken, 10);
      await this.repository.save(user);

      return newToken;
    } catch (error) {
      console.error('Error resetting token expiration:', error);
      throw new InternalServerErrorException(
        'Error resetting token expiration.',
      );
    }
  }
}
