export interface Novel {
  id: string;
  title: string;
  description: string;
  cover_image_url: string;
  type: string;
  status: 'ONGOING' | 'COMPLETED';
  rating: number;
  views: number;
  author_id: string;
  language: string;
  created_at: string;
  updated_at: string;
} 