import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from '../../entity/otp.entity';
import { GenerateOtpDto } from 'src/dto/otp/generate-otp.dto';
import { VerifyOtpDto } from 'src/dto/otp/verify-otp.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
  ) {}

  // Generate OTP
  async generateOtp(generateOtpDto: GenerateOtpDto): Promise<any> {
    try {
      const { phoneNumber } = generateOtpDto;
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6 digit OTP
      const referenceKey = uuidv4(); // Generate unique reference key

      let otpRecord = await this.otpRepository.findOne({ where: { phoneNumber } });

      if (otpRecord) {
        // Update existing record
        otpRecord.otp = otp;
        otpRecord.referenceKey = referenceKey;
        otpRecord.updatedAt = new Date();
      } else {
        // Create new record
        otpRecord = this.otpRepository.create({
          phoneNumber,
          otp,
          referenceKey,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      await this.otpRepository.save(otpRecord);

      return {
        message: 'OTP generated successfully',
        referenceKey,
        otp, // Normally, you'd send the OTP via SMS, not return it in production.
      };
    } catch (error) {
      console.error('Error generating OTP:', error.message);
      throw new InternalServerErrorException('Error generating OTP.');
    }
  }

  // Verify OTP
  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<any> {
    try {
      const { phoneNumber, otp, referenceKey } = verifyOtpDto;

      const otpRecord = await this.otpRepository.findOne({ where: { phoneNumber } });

      if (!otpRecord) {
        throw new NotFoundException('OTP record not found for this phone number.');
      }

      if (otpRecord.referenceKey !== referenceKey) {
        throw new BadRequestException('Invalid reference key.');
      }

      if (otpRecord.otp !== otp) {
        throw new BadRequestException('Invalid OTP.');
      }

      const timeDifference = new Date().getTime() - otpRecord.updatedAt.getTime();
      const timeInMinutes = timeDifference / (1000 * 60); // Calculate time difference in minutes

      if (timeInMinutes > 10) {
        throw new BadRequestException('OTP has expired.');
      }

      return { success: true, message: 'OTP verified successfully.' };
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error verifying OTP.');
    }
  }

  // Utility function to find OTP by phone number
  private async findOtpByPhoneNumber(phoneNumber: string): Promise<Otp | null> {
    try {
      return await this.otpRepository.findOne({ where: { phoneNumber } });
    } catch (error) {
      console.error('Error finding OTP record:', error.message);
      throw new InternalServerErrorException('Error finding OTP record.');
    }
  }
}
