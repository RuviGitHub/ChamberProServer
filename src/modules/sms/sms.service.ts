import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SmsService {
  private readonly apiKey: string = process.env.DIALOG_API_KEY; 
  private readonly senderId: string = process.env.DIALOG_SENDER_ID;


  async sendSMS(to: string, message: string): Promise<any> {
    const smsApiUrl = 'https://www.dialog.lk/esms/send'; 

    const payload = {
      api_key: this.apiKey,
      sender_id: this.senderId,
      to: to,
      message: message,
    };

    try {
      const response = await axios.post(smsApiUrl, payload);
      return response.data;
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new HttpException('Failed to send SMS', error.response.status);
    }
  }
}
