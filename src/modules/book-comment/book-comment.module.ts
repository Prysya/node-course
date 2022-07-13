import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookCommentService } from './book-comment.service';
import { BookCommentGateway } from './book-comment.gateway';
import { BookComment, BookCommentSchema } from './schemas/book-comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookComment.name, schema: BookCommentSchema },
    ]),
  ],
  providers: [BookCommentGateway, BookCommentService],
})
export class BookCommentModule {}
