import { Test, TestingModule } from '@nestjs/testing';
import {PostsController} from 'src/posts/post.controller';
import {PostsService} from 'src/posts/post.service';

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    postsController = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      const result:any = [{ content: 'Post 1' }];
      jest.spyOn(postsService, 'getAllPosts').mockResolvedValue(result);
      expect(await postsController.getAllPosts(undefined,1,10)).toBe(result);
    });
  });
});
