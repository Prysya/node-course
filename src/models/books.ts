import { Schema, model } from 'mongoose';
import type { IBookDocument } from 'types';

const booksSchema = new Schema<IBookDocument>({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
    required: true,
  },
  favorite: {
    type: String,
    required: true,
  },
  fileCover: {
    type: String,
    default: 'https://source.unsplash.com/random/',
  },
  fileName: {
    type: String,
    required: true,
  },
});

export const Books = model<IBookDocument>('Book', booksSchema);
