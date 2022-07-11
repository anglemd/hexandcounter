import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './.env' }),
    UsersModule,
    JwtModule.register({
      secret: AuthModule.secretJwtKey,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
  constructor() {
    // console.log('===================');
    // console.log(AuthModule.secretJwtKey);
  }
  public static get secretJwtKey(): string {
    // USE .env FILE TO STORE SECRET KEY...
    // console.log('KEY: ' + process.env.SECRET_KEY);
    return process.env.SECRET_KEY;
  }
}
