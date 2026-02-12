import { ECommentOption } from '../SelectCommentOption/enum';

export type CommentSummaryItem = {
  id: number; // ID
  comment_id: string; // 댓글 ID
  video_title: string; // 영상 제목
  author_profile_image_url?: string; // 작성자 프로필
  author_display_name: string; // 작성자명
  text_display: string; // 댓글 내용
  published_at: string; // 날짜(생성일)
  like_count?: number; // 좋아요 수
  type?: ECommentOption; // 상태

  /* 눌러서 댓글관리 페이지로 진입할때 필요한 값들 */
  video_id: string; // 비디오 ID

  // thumbnail_url: string; // 썸네일 URL
  // reviewed_count: number; // 검토된 댓글 수 [아직★]
  // comment_count: number; // 댓글 수
};
