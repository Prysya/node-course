import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('signin')
  async signin(
    @Request() req: any,
    @Body() body: Body & { email: string; password: string },
  ) {
    const user = await this.userService.findUser(body.email, body.password);

    return this.authService.sendToken(user);
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.userService.createUser(body);

    return this.authService.sendToken(user);
  }

  @Get('/login/yandex')
  @UseGuards(AuthGuard('yandex-id'))
  async loginYandex(@Req() req) {}

  @Get('/login/yandex/redirect')
  @UseGuards(AuthGuard('yandex-id'))
  async loginYandexRedirect(@Req() req) {
    return this.authService.sendToken(req.user);
  }

  @Get('/logout')
  async logout(@Req() req) {
    console.log(req.user);
    if (req.user) {
      await req.logout(req);
    }
    return;
  }
}
