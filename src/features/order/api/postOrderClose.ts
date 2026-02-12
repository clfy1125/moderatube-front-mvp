import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostOrderCloseReq {
  payment_id: string;
}

export interface IPostOrderCloseRes extends IDefaultRes {
  data: {
    order_id: number;
    payment_id: string;
    tx_id: string;
    status: string; // 이넘으로 오는 것 같은데 'completed' 말고 확인된 것 없음
    is_paid: boolean;
    payment_status: string; // 이넘으로 오는 것 같은데 'PAID' 말고 확인된 것 없음
    updated_at: string;
    message: string;
  };
}

/** 주문완료처리: 결제 완료된 주문을 처리하고 상태를 업데이트 합니다. */
export const usePostOrderClose = () => {
  return useMutation<IPostOrderCloseRes, AxiosError<IPostOrderCloseRes>, IPostOrderCloseReq>({
    mutationKey: ['postOrderClose'],
    mutationFn: async (params: IPostOrderCloseReq) => {
      const { data } = await instance().post<IPostOrderCloseRes>('/accounts/order/close/', params);

      if (!data) throw new Error('postOrderClose: Invalid server response');

      return data;
    }
  });
};
