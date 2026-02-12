<script setup lang="ts">
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';

import { usePostCommentsDelete } from '../api/postCommentsDelete';

interface IDeleteCommentBtnProps {
  commentId: string;
}

const props = defineProps<IDeleteCommentBtnProps>();
defineOptions({ name: 'DeleteCommentBtn' });

const alertStore = useAlertStore();

const { mutateAsync: postCommentsDelete, data: result } = usePostCommentsDelete();

const handlePostCommentsDelete = async () => {
  try {
    await postCommentsDelete({ comment_ids: [props.commentId] });
    if (result.value === undefined) return;

    if (result.value.success) {
      alertStore.changeAlert({
        open: true,
        error_code: '',
        error: '삭제 요청이 처리되었습니다.'
      });
    }
  } catch (err) {
    alertStore.changeAlert({
      open: true,
      error_code: (err as Err).response.data.error_code,
      error: (err as Err).response.data.error
    });
  }
};
</script>

<template>
  <button class="delete-comment-btn" @click="handlePostCommentsDelete">삭제</button>
</template>

<style lang="scss" scoped>
.delete-comment-btn {
  height: 19px;
  padding: 3px 8.5px;
  border-radius: 10px;
  background-color: $medium_red;

  @include fontStyle(11px, 600, $white);
}
</style>
