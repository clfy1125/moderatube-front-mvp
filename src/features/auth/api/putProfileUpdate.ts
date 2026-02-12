import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPutProfileUpdateReq {
  secondary_email?: string;
  nickname?: string;
  thumbnail?: string;
  terms_of_usage_agreed?: boolean;
  privacy_policy_agreed?: boolean;
}

export interface IPutProfileUpdateRes extends IDefaultRes {
  data: {
    id: number;
    user_email: string;
    user_first_name: string;
    user_last_name: string;
    nickname?: string;
    thumbnail?: string;
    secondary_email?: string;
    google_social_id: string;
    is_google_linked: boolean;
    is_verified?: boolean;
    is_active?: boolean;
    is_suspended?: boolean;
    created_at: string;
    updated_at: string;
    display_name: string;
    has_youtube_channel: boolean;
    has_active_subscription: boolean;
    subscription_status: string;
    subscription_plan: string;
    subscription_expired_at: string;
    subscription_days_remaining: number;
    subscription_is_expired: boolean;
    subscription_will_expired: boolean;
    youtube_accounts: {
      id: number;
      default_channel_id: string;
      default_channel_title: string;
      is_active: boolean;
      has_channel: boolean;
      created_at: string;
      updated_at: string;
    }[];
    agreement: {
      terms_of_usage: {
        agreed: boolean;
        agreed_at: string;
      };
      privacy_policy: {
        agreed: boolean;
        agreed_at: string;
      };
    };
    credit?: number;
  };
}

/** 사용자 프로필 업데이트: 사용자의 프로필 정보(보조 이메일, 닉네임)를 업데이트합니다. */
export const usePutProfileUpdate = () => {
  return useMutation<IPutProfileUpdateRes, AxiosError<IPutProfileUpdateRes>, IPutProfileUpdateReq>({
    mutationKey: ['putProfileUpdate'],
    mutationFn: async (params: IPutProfileUpdateReq) => {
      const { data } = await instance().put<IPutProfileUpdateRes>('/auth/profile/update/', params);

      if (!data) throw new Error('putProfileUpdate: Invalid server response');

      return data;
    }
  });
};
