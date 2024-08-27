import { Module } from '@nestjs/common';
import { UploadImageController } from './upload_image.controller';
import { UploadImageService } from './upload_image.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createHash } from 'crypto';
@Module({
  controllers: [UploadImageController],
  providers: [UploadImageService],
  imports: [
    MulterModule.register({
      storage: diskStorage({
        filename: function (req, file, cb) {
          const hash = createHash('sha256');
          hash.update(file.originalname + Date.now().toString());
          const randomFilename = hash.digest('hex').slice(0, 10);
          cb(null, randomFilename + '_' + file.originalname);
        },
        destination: `${__dirname.split('upload_image')[0]}/public/img`,
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  ],
})
export class UploadImageModule {}
