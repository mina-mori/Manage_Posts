import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.model';
import { PostDto } from './post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async getAllPosts(page: number, perPage: number): Promise<{ posts: Post[]; totalCount: number }> {
    const skipPosts = (page - 1) * perPage;

    const [posts, totalCount] = await Promise.all([
      this.postModel.find().skip(skipPosts).limit(perPage).exec(),
      this.postModel.countDocuments().exec(),
    ]);

    return { posts, totalCount };
  }

  async getPostById(id: string) {
    return this.postModel.findById(id).exec();
  }

  async createPost(userEmail: string,postDto: PostDto) {
    const newPost = new this.postModel(postDto);
    newPost.createdBy = userEmail;
    return newPost.save();
  }

  async updatePost(id: string, postDto: PostDto) {
    return this.postModel.findByIdAndUpdate(id, postDto, { new: true }).exec();
  }

  async deletePost(id: string) {
    return this.postModel.findByIdAndDelete(id).exec();
  }
}
