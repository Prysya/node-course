import type { Document } from 'mongoose';

export interface IBook {
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
}

export interface IBookDocument extends IBook, Document {}
