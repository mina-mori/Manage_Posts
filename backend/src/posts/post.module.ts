import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './post.controller';
import { PostsService } from './post.service';
import { PostSchema } from './post.schema';
import {SharedModule} from 'src/shared/shared.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]), SharedModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
