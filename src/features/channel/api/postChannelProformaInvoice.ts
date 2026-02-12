import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostChannelProformaInvoiceReq {
  channelId: string;
  post_action: 'none' | 'delete' | 'hide';
}

export interface IPostChannelProformaInvoiceRes extends IDefaultRes {
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

/** 채널 기반 스팸 분석 미리보기: 채널 ID를 받아 해당 채널의 모든 비디오의 댓글 수를 미리 확인합니다. */
export const usePostChannelProformaInvoice = () => {
  return useMutation<IPostChannelProformaInvoiceRes, AxiosError<IPostChannelProformaInvoiceRes>, IPostChannelProformaInvoiceReq>({
    mutationKey: ['postChannelProformaInvoice'],
    mutationFn: async (params: IPostChannelProformaInvoiceReq) => {
      const { data } = await instance().post<IPostChannelProformaInvoiceRes>(`/youtube/proforma-invoice/channels/${params.channelId}`, { post_action: params.post_action });

      if (!data) throw new Error('postChannelProformaInvoice: Invalid server response');

      return data;
    }
  });
};
