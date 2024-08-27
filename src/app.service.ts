import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { DefaultPageInfo } from 'src/utils/Website';

@Injectable()
export class AppService {
  getHello(res: Response) {
    return res.render('index', { page: DefaultPageInfo });
  }
}
