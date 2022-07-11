import { Module } from '@nestjs/common';
import { BookCommentService } from './book-comment.service';
import { BookCommentGateway } from './book-comment.gateway';

@Module({
  providers: [BookCommentGateway, BookCommentService]
})
export class BookCommentModule {}
