import { Controller, Post, Body, ValidationPipe, HttpStatus, HttpException, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import {LoggerService} from 'src/shared/services/logger.service';
import {ResponseModel} from 'src/shared/interfaces/shared.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly loggerService: LoggerService) {}

  @Post('register')
  async createUser(@Body(new ValidationPipe()) userDto: UserDto, @Res() response) {
    try {
      const existingUser = await this.usersService.findOneByEmail(userDto.email);
      
      if (existingUser) {
        const res: ResponseModel = {
          statusCode: 400,
          isValid: false,
          data: undefined,
          message: 'User with this email already exists'
        };
        return response.status(HttpStatus.BAD_REQUEST).json(res);
      }
      await this.usersService.create(userDto);
      const res: ResponseModel = {
        statusCode: 200,
        isValid: true,
        data: 'user created',
      };
      return response.status(HttpStatus.OK).json(res);
    }
    catch(error) {
      this.loggerService.error(error.message);
      const res: ResponseModel = {
        statusCode: 500,
        isValid: false,
        data: [],
        message: error?.message
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    }
  }
}
