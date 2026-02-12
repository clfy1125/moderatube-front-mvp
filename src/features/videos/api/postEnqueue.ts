import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostEnqueueReq {
  video_ids: string[];
  // examine: 스팸검사, examine_and_delete: 검사 및 삭제
  spam_queue_type: 'examine' | 'examine_and_delete';
}

export interface IPostEnqueueRes extends IDefaultRes {
  data: {
    message: string;
    updated_videos: number;
    not_found_videos: string[];
    spam_queue_type: string;
  };
}

/** 비디오 스팸 검사 큐 추가: 비디오들을 스팸 검사 큐에 추가합니다. */
export const usePostEnqueue = () => {
  return useMutation<IPostEnqueueRes, AxiosError<IPostEnqueueRes>, IPostEnqueueReq>({
    mutationKey: ['postEnqueue'],
    mutationFn: async (params: IPostEnqueueReq) => {
      const { data } = await instance().post<IPostEnqueueRes>('/youtube/videos/enqueue/', params);

      if (!data) throw new Error('postEnqueue: Invalid server response');

      return data;
    }
  });
};
