import type { Request, Response, NextFunction } from 'express';
import type { Socket } from 'socket.io';

export type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;

export type ExpressResponse = (req: Request, res: Response) => Promise<void>;

export type SocketMiddleware = (socket: Socket) => void;
