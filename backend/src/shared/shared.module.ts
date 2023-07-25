import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import {LoggerService} from './services/logger.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }, 
    }),
  ],
  providers: [
    LoggerService
  ],
  exports: [JwtModule,LoggerService],
})
export class SharedModule {}
