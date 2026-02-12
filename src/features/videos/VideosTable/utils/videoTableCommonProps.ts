import { VideoItem } from '../../types/VideItem';

export interface IVideoTableCommonProps {
  isPending: boolean;
  checkedIds: string[];
  items: VideoItem[];
  offset: number;
}
