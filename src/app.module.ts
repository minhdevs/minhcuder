import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post/post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadImageModule } from 'src/modules/upload_image/upload_image.module';
import { ConfigModule } from '@nestjs/config';
import { CvModule } from './modules/cv/cv.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/minhcuder-blog'),
    PostModule,
    UploadImageModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: !0,
    }),
    CvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
