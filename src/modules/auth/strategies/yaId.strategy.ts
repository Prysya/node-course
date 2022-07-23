import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';
import { ConfigService } from '@nestjs/config';

import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class YaIdStrategy extends PassportStrategy(Strategy, 'yandex-id') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super(
      {
        clientID: configService.get('YANDEX_CLIENT_ID'),
        clientSecret: configService.get('YANDEX_CLIENT_SECRET'),
        callbackURL: 'http://127.0.0.1:3000/api/auth/login/yandex/redirect',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await this.authService.validateUserByYandexId(
            profile.id,
          );

          if (!user) {
            const newUser = await this.userService.createUser({
              email: profile.emails[0].value ?? '',
              password: Math.random() * 10000 + '',
              firstName: profile.name.familyName ?? '',
              lastName: profile.name.givenName ?? '',
              yandexId: profile.id,
            });

            return done(null, newUser);
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      },
    );
  }
}
