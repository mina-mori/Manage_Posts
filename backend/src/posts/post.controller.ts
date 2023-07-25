import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { PostsService } from './post.service';
import { PostDto } from './post.dto';
import {ResponseModel} from 'src/shared/interfaces/shared.interface';
import {LoggerService} from 'src/shared/services/logger.service';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService,
    private readonly loggerService: LoggerService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllPosts(
    @Res() response,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    try {
      const allPosts = await this.postsService.getAllPosts(page, perPage);
      const res: ResponseModel = {
        statusCode: 200,
        isValid: true,
        data: allPosts,
      };
      return response.status(HttpStatus.OK).json(res);
    } catch (error) {
      this.loggerService.error(error.message);
      const res: ResponseModel = {
        statusCode: 500,
        isValid: false,
        data: [],
        message: error?.message,
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getPostById(@Param('id') id: string, @Res() response) {
      try {
      const post = await this.postsService.getPostById(id);
      const res: ResponseModel = {
        statusCode: 200,
        isValid: true,
        data: post,
      };
      return response.status(HttpStatus.OK).json(res);
    }
    catch(error) {
      this.loggerService.error(error.message);
      const res: ResponseModel = {
        statusCode: 500,
        isValid: false,
        data: 'cannot found',
        message: error?.message
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() postDto: PostDto,@Req() request, @Res() response) {
    try {
      const userEmail = request?.user?.email;
      await this.postsService.createPost(userEmail, postDto);
      const res: ResponseModel = {
        statusCode: 200,
        isValid: true,
        data: 'added'
      };
      return response.status(HttpStatus.OK).json(res);
    }
    catch(error) {
      this.loggerService.error(error.message);
      const res: ResponseModel = {
        statusCode: 500,
        isValid: false,
        data: 'not added',
        message: error?.message
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updatePost(@Param('id') id: string, @Body() postDto: PostDto, @Res() response) {
    try {
      await this.postsService.updatePost(id, postDto);
      const res: ResponseModel = {
        statusCode: 200,
        isValid: true,
        data: 'edited',
      };
      return response.status(HttpStatus.OK).json(res);
    }
    catch(error) {
      this.loggerService.error(error.message);
      const res: ResponseModel = {
        statusCode: 500,
        isValid: false,
        data: 'not edited',
        message: error?.message
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param('id') id: string, @Res() response) {
    try {
      await this.postsService.deletePost(id);
      const res: ResponseModel = {
        statusCode: 200,
        isValid: true,
        data: 'deleted',
      };
      return response.status(HttpStatus.OK).json(res);
    }
    catch(error) {
      this.loggerService.error(error.message);
      const res: ResponseModel = {
        statusCode: 500,
        isValid: false,
        data: 'not deleted',
        message: error?.message
      };
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res);
    }
  }
}
