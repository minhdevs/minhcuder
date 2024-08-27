import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { UploadImageService } from 'src/modules/upload_image/upload_image.service';

export interface ImgurDataResponse {
  status: number;
  success: boolean;
  data: {
    id: string;
    deletehash: string;
    account_id: string | null;
    account_url: string | null;
    ad_type: string | null;
    ad_url: string | null;
    title: string | null;
    description: string | null;
    name: string;
    type: string;
    width: number;
    height: number;
    size: number;
    views: number;
    section: number | null | string;
    vote: number | null | string;
    bandwidth: number;
    animated: boolean;
    favorite: boolean;
    in_gallery: boolean;
    in_most_viral: boolean;
    has_sound: boolean;
    is_ad: boolean;
    nsfw: number | null | string;
    link: string;
    tags: string[];
    datetime: number;
    mp4: string;
    hls: string;
  };
}

@Controller('upload-image')
export class UploadImageController {
  constructor(private readonly uploadImageServices: UploadImageService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const imgurResponse: ImgurDataResponse =
      await this.uploadImageServices.uploadSingleImage(req);

    return res.json(imgurResponse);
  }
}
