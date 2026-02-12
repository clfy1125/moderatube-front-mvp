<script setup lang="ts">
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';

import { usePostCommentsDelete } from '../api/postCommentsDelete';

interface IDeleteAllSpamBtnProps {
  commentIds: string[];
}

const props = defineProps<IDeleteAllSpamBtnProps>();
defineOptions({ name: 'DeleteAllSpamBtn' });

const alertStore = useAlertStore();

const { mutateAsync: postCommentsDelete, data: result } = usePostCommentsDelete();

const handlePostCommentsDelete = async () => {
  try {
    await postCommentsDelete({ comment_ids: props.commentIds });
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
  <TextBtn text="스팸 전부 삭제" @click="handlePostCommentsDelete" />
</template>

<style lang="scss" scoped></style>
