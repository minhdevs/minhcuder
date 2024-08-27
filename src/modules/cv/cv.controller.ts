import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { DefaultPageInfo } from 'src/utils/Website';

@Controller('cv')
export class CvController {
  @Get()
  index(@Res() res: Response) {
    return res.render('cv/index', {
      page: { ...DefaultPageInfo, pageTitle: 'CV - Nguyễn Văn Minh' },
    });
  }
}
