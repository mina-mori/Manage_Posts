import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './user.schema';
import {SharedModule} from 'src/shared/shared.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),SharedModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
