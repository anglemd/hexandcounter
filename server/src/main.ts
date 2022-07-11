import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
    exclude: [{ path: '', method: RequestMethod.GET }],
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log('Listening on port ' + port);
}
bootstrap();
