import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as fs from 'fs';
import * as FormData from 'form-data';
import fetch from 'node-fetch';

@Injectable()
export class UploadImageService {
  async uploadSingleImage(req: Request): Promise<any> {
    try {
      const file = req.file;

      const imgPath: string = file.path;

      const formData = new FormData();
      formData.append('image', fs.createReadStream(imgPath));
      formData.append('type', 'file');

      const formDataLength = await new Promise((resolve, reject) => {
        formData.getLength((err, length) => {
          if (err) {
            reject(err);
          } else {
            resolve(length);
          }
        });
      });

      const uploadImgur = await fetch(process.env.IMGUR_API_URI, {
        method: 'POST',
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
          ...formData.getHeaders(),
          'Content-Length': formDataLength.toString(),
        },
        body: formData,
      });

      fs.unlinkSync(imgPath);

      const dedata = uploadImgur.json();

      return dedata;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
