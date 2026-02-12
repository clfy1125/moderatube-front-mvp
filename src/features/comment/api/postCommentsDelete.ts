import { useMutation } from '@tanstack/vue-query';
import { AxiosError } from 'axios';

import { instance } from '@/shared/api/instance';
import { IDefaultRes } from '@/shared/api/schema';

export interface IPostCommentsDeleteReq {
  comment_ids: string[];
}

export interface IPostCommentsDeleteRes extends IDefaultRes {
  message: string;
  data: {
    /*  */
  };
}

/** 댓글 삭제: 여러 댓글의 타입을 'deleted'로 변경합니다. */
export const usePostCommentsDelete = () => {
  return useMutation<IPostCommentsDeleteRes, AxiosError<IPostCommentsDeleteRes>, IPostCommentsDeleteReq>({
    mutationKey: ['postCommentsDelete'],
    mutationFn: async (params: IPostCommentsDeleteReq) => {
      const { data } = await instance().post<IPostCommentsDeleteRes>('/youtube/comments/delete/', params);

      if (!data) throw new Error('postCommentsDelete: Invalid server response');

      return data;
    }
  });
};
