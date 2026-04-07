export interface BookPage {
  id: string;
  content: string;
  pageNumber: number;
  image?: string;
  imagePosition?: 'top' | 'center' | 'bottom' | 'full';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  coverColor: string;
  pages: BookPage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BookMetadata {
  title: string;
  author: string;
  description: string;
  coverImage: string;
  coverColor: string;
}
