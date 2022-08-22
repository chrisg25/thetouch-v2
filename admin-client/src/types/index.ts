export interface PhotoType {
  id: string;
  url: string;
}

export interface ArticleType {
  category: string;
  headline: string;
  body: string;
  authored_by: string;
  authored_by_id: number | null;
  graphics_by: string;
  graphics_by_id: number | null;
  photos: PhotoType[];
  date?: string;
  time?: string;
  createdAt?: string;
  error?: string;
}

export interface ErrorType {
  for: string;
  message: string;
}
