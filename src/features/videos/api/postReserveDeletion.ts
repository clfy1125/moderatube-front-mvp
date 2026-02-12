import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostReserveDeletionReq {
  video_id: string;
  // 자동 삭제 예약 시간
  auto_deletion_at: string; // 날짜 형태  HH:MM:SS 형식 "06:52:07.464Z"
}

export interface IPostReserveDeletionRes extends IDefaultRes {
  data: {
    video_id: string;
    is_auto_deletion_reserved: boolean;
    auto_deletion_at: string;
    message: string;
  };
}

/** 비디오 자동 삭제 예약: 특정 비디오의 자동 삭제를 예약합니다. */
export const usePostReserveDeletion = () => {
  return useMutation<IPostReserveDeletionRes, AxiosError<IPostReserveDeletionRes>, IPostReserveDeletionReq>({
    mutationKey: ['postReserveDeletion'],
    mutationFn: async (params: IPostReserveDeletionReq) => {
      const { data } = await instance().post<IPostReserveDeletionRes>(`/youtube/videos/${params.video_id}/reserve_deletion/`, { auto_deletion_at: params.auto_deletion_at });
      if (!data) throw new Error('postReserveDeletion: Invalid server response');

      return data;
    }
  });
};
