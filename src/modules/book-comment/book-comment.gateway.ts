import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody, WebSocketServer,
} from '@nestjs/websockets';
import { BookCommentService } from './book-comment.service';
import { CreateBookCommentDto } from './dto/create-book-comment.dto';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BookCommentGateway {
  constructor(private readonly bookCommentService: BookCommentService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createBookComment')
  create(@MessageBody() createBookCommentDto: CreateBookCommentDto) {
    return this.bookCommentService.create(createBookCommentDto);
  }

  @SubscribeMessage('findAllBookComment')
  findAll(@MessageBody() id: number) {
    return this.bookCommentService.findAll(id);
  }



  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  // }
  //
  // @SubscribeMessage('identity')
  // async identity(@MessageBody() data: number): Promise<number> {
  //   return data;
  // }
}
