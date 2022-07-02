import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IdValidationPipe } from '../../common/pipes/idValidation.pipe';
import { JoiValidationPipe } from '../../common/pipes/joiValidation.pipe';
import { createBookSchema } from '../../modules/books/joi/createBook.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createBookSchema))
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', new IdValidationPipe()) id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.delete(id);
  }
}
