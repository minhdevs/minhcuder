import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PostService } from 'src/modules/post/post.service';
import { DefaultPageInfo } from 'src/utils/Website';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  homePost(@Res() res: Response) {
    return this.postService.homePost(res);
  }

  @Get('/create')
  formPost(@Res() res: Response) {
    return res.render('post/FormPost', { page: DefaultPageInfo });
  }

  @Post('/create')
  createPost(@Req() req: Request, @Res() res: Response) {
    return this.postService.createPost(req, res);
  }

  // post/read/:slug
  @Get('/read/:slug')
  readPost(@Req() req: Request, @Res() res: Response) {
    return this.postService.readPost(req, res);
  }
}
