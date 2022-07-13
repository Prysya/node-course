import { Injectable } from '@nestjs/common';
import { CreateBookCommentDto } from './dto/create-book-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BookComment,
  BookCommentDocument,
} from './schemas/book-comment.schema';

@Injectable()
export class BookCommentService {
  constructor(
    @InjectModel(BookComment.name)
    private readonly bookCommentDocumentModel: Model<BookCommentDocument>,
  ) {}

  createComment(createBookCommentDto: CreateBookCommentDto) {
    return this.bookCommentDocumentModel.create(createBookCommentDto)
  }

  findAllBookComment(id: number) {
    return this.bookCommentDocumentModel.find({id})
  }
}
