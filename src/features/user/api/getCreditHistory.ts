import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export enum ECreditTransactionType {
  purchase = 'purchase', // 구매
  usage = 'usage', // 사용
  refund = 'refund', // 환불
  bonus = 'bonus', // 보너스
  adjustment = 'adjustment' // 조정
}

export interface IGetCreditHistoryReq {
  page: number;
}

export interface IGetCreditHistoryRes extends IDefaultRes {
  data: {
    results: {
      id: number;
      created_at: string;
      transaction_type: ECreditTransactionType;
      description: string;
      amount: number;
      balance_before: number;
      balance_after: number;
      details?: string;
    }[];

    pagination: {
      current_page: number;
      total_pages: number;
      total_count: number;
      has_next: boolean;
      has_previous: boolean;
    };
  };
}

/* 크레딧 히스토리 목록 조회: 사용자의 크레딧 충전/소진 내역을 조회합니다. */
export const useGetCreditHistory = () => {
  return useMutation<IGetCreditHistoryRes, AxiosError<IGetCreditHistoryRes>, IGetCreditHistoryReq>({
    mutationKey: ['getCreditHistory'],
    mutationFn: async (params: IGetCreditHistoryReq) => {
      const { data } = await instance().request({ method: 'GET', url: '/accounts/credit/history/', params });

      if (!data || !data.data) throw new Error('getCreditHistory: Invalid server response');

      return data;
    }
  });
};
