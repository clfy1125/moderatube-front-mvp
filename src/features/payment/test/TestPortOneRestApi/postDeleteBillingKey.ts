import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from './instance';

export type IPostBillingKeyPayReq = {
  billingKey: string;
};
export type IPostBillingKeyPayRes = {
  deletedAt: string;
};

/* 빌링키 삭제 */
export const usePostDeleteBillingKey = () => {
  return useMutation<IPostBillingKeyPayRes, AxiosError<IPostBillingKeyPayRes>, IPostBillingKeyPayReq>({
    mutationKey: ['postDeleteBillingKey'],
    mutationFn: async (billingKey: IPostBillingKeyPayReq) => {
      const { data } = await instance.delete(`/billing-keys/${billingKey}`);

      if (!data) throw new Error('postDeleteBillingKey: Invalid server response');

      return data;
    }
  });
};
