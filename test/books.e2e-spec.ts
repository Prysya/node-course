import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BooksModule } from '../src/books/books.module';
import { BooksService } from '../src/books/books.service';
import { AppModule } from '../src/app.module';

describe('Cats', () => {
  let app: INestApplication;
  let booksService = {
    findAll: () => [{ test: 'books' }],
    create: () => ({ test: 'book' }),
    findOne: () => ({ test: 'book' }),
    update: () => ({ test: 'book-updated' }),
    delete: () => ({ test: 'book-deleted' }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET books`, () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(booksService.findAll());
  });

  it('/POST books', () => {
    return request(app.getHttpServer())
      .post('/books')
      .expect(201)
      .expect({ test: 'book' });
  });

  it('/GET books/:id', () => {
    return request(app.getHttpServer())
      .get('/books/1')
      .expect(200)
      .expect({ test: 'book' });
  });

  it('/PUT books/:id', () => {
    return request(app.getHttpServer())
      .put('/books/1')
      .expect(200)
      .expect({ test: 'book-updated' });
  });

  it('/DELETE books/:id', () => {
    return request(app.getHttpServer())
      .delete('/books/1')
      .expect(200)
      .expect({ test: 'book-deleted' });
  });

  afterAll(async () => {
    await app.close();
  });
});
