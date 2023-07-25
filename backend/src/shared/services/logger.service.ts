import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as mkdirp from 'mkdirp';
@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    mkdirp.sync('./logs');
    this.logger = winston.createLogger({
      level: 'error',
      transports: [
        new DailyRotateFile({
          filename: './logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '200m',
          maxFiles: '30d',
        }),
      ],
    });
  }

  public error(message: string, stackTrace?: string): void {
    this.logger.error(message, { stackTrace });
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public verbose(message: string): void {
    this.logger.verbose(message);
  }
}
