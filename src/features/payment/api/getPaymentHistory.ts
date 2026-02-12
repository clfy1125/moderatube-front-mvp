import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export enum EPaymentTransactionType {
  payment = 'payment', // 결제
  cancel = 'cancel' // 취소
}

export enum ECardMethod {
  registered_card = 'registered_card', // 등록된 카드
  direct_card = 'direct_card', // 카드 직접 결제
  unknown = 'unknown' // 정보 없음
}

export interface IGetPaymentHistoryReq {
  page: number;
}

export interface IGetPaymentHistoryRes extends IDefaultRes {
  data: {
    results: {
      id: number;
      payment_id: string;
      pg_tx_id: string;
      transaction_type: EPaymentTransactionType;
      amount: string;
      currency?: string;
      details?: string;
      receipt_url?: string;
      card_display_info: {
        method: ECardMethod;
        card_name: string;
        card_brand: string;
        card_number: string;
        card_id: number;
      };
      payment_method: 'direct_card';
      is_first_payment: boolean;
      created_at: string;
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

/* 결제 히스토리 목록 조회: 사용자의 결제/취소 내역을 조회합니다. */
export const useGetPaymentHistory = () => {
  return useMutation<IGetPaymentHistoryRes, AxiosError<IGetPaymentHistoryRes>, IGetPaymentHistoryReq>({
    mutationKey: ['getPaymentHistory'],
    mutationFn: async (params: IGetPaymentHistoryReq) => {
      const { data } = await instance().request({ method: 'GET', url: '/accounts/payment/history/', params });

      if (!data || !data.data) throw new Error('getPaymentHistory: Invalid server response');

      return data;
    }
  });
};
