import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

import slugify from 'slugify';

export type PostDocument = HydratedDocument<Post>;

const generateRandomString = (length: number): string => {
  return Math.random().toString(36).substr(2, length).toUpperCase();
};

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  cover_image: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  tags: string;

  @Prop({ required: false, unique: true })
  slug: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isNew) {
    const baseSlug = slugify(this.title, { lower: true, strict: true });
    const randomString = generateRandomString(8); // Tạo chuỗi ngẫu nhiên 8 ký tự
    this.slug = `${baseSlug}-${randomString}`; // Thêm chuỗi ngẫu nhiên vào slug
  }
  next();
});
