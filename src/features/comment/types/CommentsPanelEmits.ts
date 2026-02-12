export type CommentsPanelEmits = {
  (e: 'need-show-btns', state: boolean): void;
  (e: 'on-videos-analysis'): void;
  (e: 'on-videos-analysis-delete'): void;
};
