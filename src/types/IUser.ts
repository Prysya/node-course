import type { Model, Document } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  findUserByCredentials: (
    username: string,
    password: string,
  ) => Promise<IUserDocument>;
}
