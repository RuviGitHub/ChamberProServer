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

  async registerUser(dto: RegisterUserDTO): Promise<Partial<User>> { 
    try {
      // Check if the phone number or email already exists
      const existingPhoneNumber = await this.findByPhoneNumber(dto.phone_number);
      const existingEmail = await this.findByEmail(dto.email);

      if (existingPhoneNumber) {
        throw new BadRequestException('Phone number already exists.');
      }
      if (existingEmail) {
        throw new BadRequestException('Email already exists.');
      }

      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      // Generate OTP for verification
      const otp = await this.otpService.generateOtp();

      const user = this.repository.create({
        ...dto,
        password: hashedPassword, // Store the hashed password
        latest_otp: otp,
        is_otp_verified: false,
        is_chamber_owner: true,
        is_first_login: true,
        role_id: 1,
        status: 1,
        is_active: true,
      });

      const savedUser = await this.repository.save(user);

      // Remove the password from the saved user object before returning
      const { password, ...result } = savedUser;

      return result; // Return the user without the password
    } catch (error) {
      console.error('Error registering user:', error.message);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error registering user.');
    }
  }

  // async setupPassword(dto: SetupPasswordDTO): Promise<User> {
  //   try {
  //     const existingEntity = await this.findById(dto.user_id);

  //     if (!existingEntity) {
  //       throw new NotFoundException('User not found.');
  //     }

  //     // Hash the new password before saving
  //     const hashedPassword = await bcrypt.hash(dto.password, 10);
  //     existingEntity.password = hashedPassword;
  //     existingEntity.is_otp_verified = true;
  //     existingEntity.updated_at = new Date(); // Update timestamp

  //     return await this.repository.save(existingEntity);
  //   } catch (error) {
  //     console.error('Error updating user password:', error.message);
  //     if (error instanceof NotFoundException) {
  //       throw error;
  //     }
  //     throw new InternalServerErrorException('Error updating user password.');
  //   }
  // }

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

  async updateByFilters(filters: Partial<User>, inputs: Partial<User>) {
    try {
      return await this.repository.update(filters, inputs);
    } catch (error) {
      console.error('Error resetting token expiration:', error);
      throw new InternalServerErrorException('Error updating user.');
    }
  }
}
