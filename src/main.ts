import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as partials from 'express-partials';
import * as cookieParser from 'cookie-parser';
// import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // dotenv.config();
  app.use(partials());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('ejs');

  await app.listen(process.env.PORT, () => {
    console.log('App running');
  });
}
bootstrap();
