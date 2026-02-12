export type VideoItem = {
  id: number;
  video_id: string;
  is_bookmarked?: boolean;
  thumbnail_url?: string;
  title: string;
  published_at: string;
  view_count?: number;
  spam_review_count?: number;
  comment_count?: number;
};
