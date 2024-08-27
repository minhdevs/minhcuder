import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Post } from '../../models/Post';
import { Model } from 'mongoose';
import { CreatePostDTO } from 'src/dto/Post';
import { marked } from 'marked';
import { DefaultPageInfo, IPageInfo } from 'src/utils/Website';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private PostModel: Model<Post>,
  ) {}

  async homePost(res: Response) {
    const posts = await this.PostModel.find({});
    return res.render('post/index', {
      posts: posts.reverse(),
      page: DefaultPageInfo,
    });
  }

  async createPost(req: Request, res: Response): Promise<any> {
    const postDTO: CreatePostDTO = req.body;

    const createdPost = await this.PostModel.create(postDTO);
    if (createdPost) {
      res.json({
        message: 'Created new post!',
        data: createdPost,
        success: true,
      });
    } else {
      throw new HttpException('Create failed!', HttpStatus.BAD_REQUEST);
    }
  }

  async readPost(req: Request, res: Response) {
    const slug = req.params.slug.trim();
    const post = await this.PostModel.findOne({ slug: slug });
    const page: IPageInfo = {
      ...DefaultPageInfo,
      pageTitle: post.title,
      pageDescription: post.description,
      pageUrl: `https://minhcuder.com/post/read/${post.slug}`,
      pageImage: post.cover_image,
      pageKeywords: `${post.title}, ${post.tags.split(',').map((e) => `#${e.trim()}`)}}, ${post.description}`,
    };

    if (post) {
      const contentHtml = await marked(JSON.parse(post.content));

      res.render('post/ReadPost', {
        post: {
          ...post.toObject(),
          tags: post.tags.split(',').map((e) => `#${e.trim()}`),
          contentHtml, // Thêm HTML đã chuyển đổi vào đối tượng post
        },
        page, //
      });
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
