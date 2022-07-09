import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { getModelToken } from '@nestjs/mongoose';

const mockBook = {
  _id: '625b080057a2eed20603d5f5',
  id: '5c6f94f2-fa08-4afa-8643-3c799682e0dd',
  title: 'test-title',
  description: 'dasdasdasd',
  authors: 'asdasdasdasd',
  favorite: 'test',
  fileCover: 'https://source.unsplash.com/random/',
  fileName: 'test',
  __v: 0,
};

const mockBooks = [
  {
    _id: '625b080057a2eed20603d5f5',
    id: '5c6f94f2-fa08-4afa-8643-3c799682e0dd',
    title: 'test-title',
    description: 'dasdasdasd',
    authors: 'asdasdasdasd',
    favorite: 'test',
    fileCover: 'https://source.unsplash.com/random/',
    fileName: 'test',
    __v: 0,
  },
  {
    _id: '625c5b32271d6f6c33359b33',
    id: '5a395b79-2372-4c9d-9325-e6becbb4df8d',
    title: 'Book of Kiskas',
    description: 'asdadsasd',
    authors: 'asdadasda',
    favorite: 'test',
    fileCover: 'https://source.unsplash.com/random/',
    fileName: 'test',
    __v: 0,
  },
];

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockBook),
            constructor: jest.fn().mockResolvedValue(mockBook),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
            findByIdAndRemove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<Book>>(getModelToken(Book.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all books', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockBooks),
    } as any);

    const books = await service.findAll();

    expect(books).toEqual(mockBooks);
  });

  it('should insert a new book', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        id: '5c6f94f2-fa08-4afa-8643-3c799682e0dd',
        title: 'test-title',
        description: 'dasdasdasd',
        authors: 'asdasdasdasd',
        favorite: 'test',
        fileCover: 'https://source.unsplash.com/random/',
        fileName: 'test',
      }),
    );

    const newBook = await service.create({
      id: '5c6f94f2-fa08-4afa-8643-3c799682e0dd',
      title: 'test-title',
      description: 'dasdasdasd',
      authors: 'asdasdasdasd',
      favorite: 'test',
      fileCover: 'https://source.unsplash.com/random/',
      fileName: 'test',
    });

    expect(newBook).toEqual(newBook);
  });

  it('should find a book by id', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockBook),
    } as any);

    const book = await service.findOne(mockBook._id);

    expect(book).toEqual(mockBook);
  });

  it('should update book params', async () => {
    jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
      ...mockBook,
      title: 'updated-title',
    } as any);

    const newBook = await service.update(mockBook._id, {
      title: 'updated-title',
    });

    expect(newBook).toEqual({ ...mockBook, title: 'updated-title' });
  });

  it('should delete book and return deleted book', async () => {
    jest.spyOn(model, 'findByIdAndRemove').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockBook),
    } as any);

    const deletedBook = await service.delete(mockBook._id);

    expect(deletedBook).toEqual(mockBook);
  });
});
