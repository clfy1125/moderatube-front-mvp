export type DeletedCommentItem = {
  id: number; // ID
  comment_id: string; // 댓글 ID
  author_display_name: string; // 작성자명
  author_profile_image_url?: string; // 작성자이미지
  text_display: string; // 댓글 내용
  published_at: string; // 날짜
  like_count?: number; //  좋아요 수
};
