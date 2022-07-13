import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // USES dotenv UNDER THE COVERS...
import { ServeStaticModule } from '@nestjs/serve-static'; // SERVE STATIC FILES...
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    // LOAD THE .env FILE...  https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({ envFilePath: './.env', isGlobal: true }),
    // DEFINE A STATIC FOLDER TO HOLD OUR CLIENT CODE...
    ServeStaticModule.forRoot({
      // rootPath: join(__dirname, '..', '..', 'client', 'dist'), // SERVE THE ANGULAR APP FROM THE DIST FOLDER...
      rootPath: join(__dirname, 'client_dist'), // SERVE THE ANGULAR APP FROM THE client_dist FOLDER SO I CAN DEPLOY A ZIPPED FOLDER TO AWS...
      // serveRoot: 'dist',
      renderPath: '/app', // GOTO SERVER/app TO LOAD THE APP...
      exclude: ['/api*'],
    }),
    MongooseModule.forRoot(process.env.AMD_MONGODB_ATLAS_URI),
    AuthModule,
    UsersModule,
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    // console.log(process.env.AMD_MONGODB_ATLAS_URI);
  }
}
