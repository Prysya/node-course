import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  authors: string;

  @Prop({ required: true })
  favorite: string;

  @Prop({ default: 'https://source.unsplash.com/random/' })
  fileCover: string;

  @Prop({ required: true })
  fileName: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
