import { Injectable } from '@nestjs/common';
import { CreateBookCommentDto } from './dto/create-book-comment.dto';

@Injectable()
export class BookCommentService {
  create(createBookCommentDto: CreateBookCommentDto) {
    return 'This action adds a new bookComment';
  }

  findAll(id: number) {
    return `This action returns all bookComment`;
  }
}
