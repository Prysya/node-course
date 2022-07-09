import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const createBookDto: CreateBookDto = {
    id: '5c6f94f2-fa08-4afa-8643-3c799682e0dd',
    title: 'test-title',
    description: 'dasdasdasd',
    authors: 'asdasdasdasd',
    favorite: 'test',
    fileCover: 'https://source.unsplash.com/random/',
    fileName: 'test',
  };

  const mockBook = {
    ...createBookDto,
    _id: '625b080057a2eed20603d5f5',
    __v: 0,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest.fn().mockResolvedValue(createBookDto),
            findAll: jest
              .fn()
              .mockResolvedValue([createBookDto, createBookDto]),
            findOne: jest.fn().mockResolvedValue(createBookDto),
            update: jest
              .fn()
              .mockResolvedValue({ ...createBookDto, title: 'updated-title' }),
            delete: jest.fn().mockResolvedValue(createBookDto),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockBook);

      await controller.create(createBookDto);
      expect(createSpy).toHaveBeenCalledWith(createBookDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of cats', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        createBookDto,
        createBookDto,
      ]);

      expect(service.findAll).toHaveBeenCalled();
    });
  });
  describe('findOne()', () => {
    it('should find a book by _id', async () => {
      await expect(controller.findOne(mockBook._id)).resolves.toEqual(
        createBookDto,
      );

      expect(service.findOne).toHaveBeenCalled();
    });
  });
  describe('update()', () => {
    it('should update a user by id', async () => {
      await expect(
        controller.update(mockBook._id, { title: 'updated-title' }),
      ).resolves.toEqual({ ...createBookDto, title: 'updated-title' });

      expect(service.update).toHaveBeenCalled();
    });
  });
  describe('delete()', () => {
    it('should delete a user by id and rerun deleted user', async () => {
      await expect(controller.remove(mockBook._id)).resolves.toEqual(
        createBookDto,
      );

      expect(service.delete).toHaveBeenCalled();
    });
  });
});
