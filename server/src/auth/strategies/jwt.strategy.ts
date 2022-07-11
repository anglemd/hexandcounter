import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthModule } from './../auth.module';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AuthModule.secretJwtKey,
    });
  }

  async validate(payload: any) {
    // THE payload IS THE decoded JWT payload.
    // console.log('JwtStrategy validate() =====');
    // console.log(payload);
    return {
      userName: payload.userName,
      displayName: payload.displayName,
      email: payload.email,
    };
  }
}
