import path from 'path';

export const generatePathToBook = (id: string): string =>
  path.join(__dirname, '..', 'public', 'books', `book_${id}.txt`);
