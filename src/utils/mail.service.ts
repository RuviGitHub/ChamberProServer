import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: this.configService.get<boolean>('MAIL_SECURE'),
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('MAIL_FROM'),
      to,
      subject: 'ChamberPro verification code',
      text: `Your OTP code is ${otp}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to send OTP email.',
        error.message,
      );
    }
  }
}
