import 'reflect-metadata';
import { Container } from 'inversify';

import { BooksRepository } from '../models/booksRepository';

const container = new Container();
container.bind(BooksRepository).toSelf();

export { container };
