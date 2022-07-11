import { PartialType } from '@nestjs/mapped-types';
import { CreateBookCommentDto } from './create-book-comment.dto';

export class UpdateBookCommentDto extends PartialType(CreateBookCommentDto) {}
