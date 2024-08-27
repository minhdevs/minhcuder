export interface IPageInfo {
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string;
  pageAuthor: string;
  pageUrl: string;
  webUrl: string;
  pageImage: string;
  siteName: string;
  pageIcon: string;
}

export type TypeDefaultPageInfo = IPageInfo;

export const DefaultPageInfo: TypeDefaultPageInfo = {
  pageAuthor: 'minhcuder',
  webUrl: 'http://localhost:3000',
  siteName: 'Blog của minhcuder - mwarevn',
  pageTitle: 'Blog của minhcuder - mwarevn',
  pageDescription:
    'Nguyễn Văn Minh, biệt danh minhcuder, là một lập trình viên back-end đầy nhiệt huyết và hiện đang là sinh viên IT. Blog mwarevn của Minh là nơi chia sẻ kiến thức lập trình back-end, lưu giữ những kỷ niệm trong hành trình trở thành lập trình viên chuyên nghiệp. Khám phá các bài viết bổ ích về công nghệ, lập trình và hành trình phát triển sự nghiệp của một coder trẻ đầy đam mê.',
  pageUrl: 'http://localhost:3000',
  pageImage: 'http://localhost:3000/assets/img/banner.png',
  pageKeywords: 'minhcuder, mwarevn, nguyễn văn minh',
  pageIcon: 'http://localhost:3000/assets/img/dev.png',
};
