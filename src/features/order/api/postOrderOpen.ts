import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostOrderOpenReq {
  productId: number;
}

export interface IPostOrderOpenRes extends IDefaultRes {
  data: {
    order_id: number; // 주문 ID
    payment_id: string; // 결제 ID
    status: string; // 주문 상태
    message: string; // 주문 생성 메세지
  };
}

/** 주문생성: 새로운 주문을 생성합니다. */
export const usePostOrderOpen = () => {
  return useMutation<IPostOrderOpenRes, AxiosError<IPostOrderOpenRes>, IPostOrderOpenReq>({
    mutationKey: ['postOrderOpen'],
    mutationFn: async (params: IPostOrderOpenReq) => {
      const { data } = await instance().post<IPostOrderOpenRes>('/accounts/order/open/', params);

      if (!data) throw new Error('postOrderOpen: Invalid server response');

      return data;
    }
  });
};
