import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

  @Get('profile')
  @UseGuards(AuthGuard('yandex-id'))
  getProfile(@Req() req) {
    console.log(req.user);
    return req.user;
  }
}
