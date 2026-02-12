import { VideoItem } from '../../types/VideItem';

export type VideosTableCommonEmits = {
  (e: 'on-toggle-head-checkbox', state: boolean): void;
  (e: 'on-toggle-row-checkbox', id: string, state: boolean): void;
  (e: 'on-select-video', video: VideoItem): void;
};
