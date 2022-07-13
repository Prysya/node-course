import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  WsResponse,
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

  @SubscribeMessage('addComment')
  async create(@MessageBody() createBookCommentDto: CreateBookCommentDto):Promise<WsResponse<CreateBookCommentDto>> {
    const newComment = await this.bookCommentService.createComment(
      createBookCommentDto,
    );

    return { event: 'addComment', data: newComment };
  }

  @SubscribeMessage('getAllComments')
  async findAll(@MessageBody() id: number):Promise<WsResponse<CreateBookCommentDto[]>> {
    const comments = await this.bookCommentService.findAllBookComment(id);

    return { event: 'getAllComments', data: comments };
  }
}
