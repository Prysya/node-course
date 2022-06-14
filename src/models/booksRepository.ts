import { IBook } from 'types';

export class BooksRepository {
  async createBook(book: IBook) {}

  async getBook(id: string) {}

  async getBooks() {}

  async updateBook(id: string) {}

  async deleteBook(id: string) {}
}
