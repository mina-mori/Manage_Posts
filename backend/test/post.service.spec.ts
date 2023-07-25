import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import {PostsService} from 'src/posts/post.service';

describe('PostsService', () => {
  let postsService: PostsService;

  const mockPostModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken('Post'),
          useValue: mockPostModel,
        },
      ],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      const result = [{ content: 'Post 1' }];
      mockPostModel.find.mockResolvedValue(result);
      expect(await postsService.getAllPosts(1,10)).toBe(result);
    });
  });

});
