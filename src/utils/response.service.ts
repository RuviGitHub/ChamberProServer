import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ResponseService {
  sendSuccessResponse(res: Response, message: string, data: any = null) {
    return res.status(200).json({
      status: 200,
      success: true,
      message,
      data,
    });
  }

  sendErrorResponse(res: Response, statusCode: number, message: string) {
    return res.status(statusCode).json({
      status: statusCode,
      success: false,
      message,
      data: null,
    });
  }

  sendUnauthorizedResponse(res: Response, message: string) {
    return res.status(401).json({
      status: 401,
      success: false,
      message,
      data: null,
    });
  }

  sendInternalServerErrorResponse(res: Response, message: string) {
    return res.status(500).json({
      status: 500,
      success: false,
      message,
      data: null,
    });
  }

  sendCustomResponse(
    res: Response,
    statusCode: number,
    message: string,
    success: boolean,
    data: any = null,
  ) {
    return res.status(statusCode).json({
      status: statusCode,
      success,
      message,
      data,
    });
  }
}
