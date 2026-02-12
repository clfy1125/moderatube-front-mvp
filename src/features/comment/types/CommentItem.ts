import { ECommentOption } from '../SelectCommentOption/enum';

export type CommentItem = {
  id: number; // ID
  comment_id: string; // 댓글 ID
  text_display: string; // 댓글 내용
  author_profile_image_url?: string; // 작성자 프로필 [아직★]
  author_display_name: string; // 작성자
  published_at: string;
  like_count?: number;
  type?: ECommentOption;
  is_comment_thread?: boolean; // 최상위 댓글 여부
  comment_thread_id?: string; // 상위 댓글 ID
};
