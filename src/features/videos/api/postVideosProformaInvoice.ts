import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostVideosProformaInvoiceReq {
  video_ids: string[];
  post_action: 'none' | 'delete' | 'hide';
}

export interface IPostVideosProformaInvoiceRes extends IDefaultRes {
  data: {
    channel_id: string;
    channel_title: string;
    total_videos: number;
    total_comments: number;
    required_credits: number;
    available_credits: number;
    estimated_chunks: number;
    message: string;
  };
}

/** 비디오 기반 스팸 분석 미리보기: 비디오 ID 배열을 받아 해당 비디오들의 댓글 수를 미리 확인합니다. */
export const usePostVideosProformaInvoice = () => {
  return useMutation<IPostVideosProformaInvoiceRes, AxiosError<IPostVideosProformaInvoiceRes>, IPostVideosProformaInvoiceReq>({
    mutationKey: ['postVideosProformaInvoice'],
    mutationFn: async (params: IPostVideosProformaInvoiceReq) => {
      const { data } = await instance().post<IPostVideosProformaInvoiceRes>('/youtube/proforma-invoice/proforma/videos/', params);

      if (!data) throw new Error('postVideosProformaInvoice: Invalid server response');

      return data;
    }
  });
};
