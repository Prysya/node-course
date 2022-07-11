import { Test, TestingModule } from '@nestjs/testing';
import { BookCommentGateway } from './book-comment.gateway';
import { BookCommentService } from './book-comment.service';

describe('BookCommentGateway', () => {
  let gateway: BookCommentGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookCommentGateway, BookCommentService],
    }).compile();

    gateway = module.get<BookCommentGateway>(BookCommentGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
