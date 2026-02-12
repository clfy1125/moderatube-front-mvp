<script setup lang="ts">
import { ref } from 'vue';

import { usePostVideoBookmark } from '@/features/videos/api/postVideoBookmark';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';

interface IBookmarkStateBtnProps {
  videoId: string;
  isBookmarked?: boolean;
}

const props = withDefaults(defineProps<IBookmarkStateBtnProps>(), {
  isBookmarked: false
});
defineOptions({ name: 'BookmarkStateBtn' });
defineEmits(['click']);

const alertStore = useAlertStore();
const { mutateAsync: postVideoBookmark, data } = usePostVideoBookmark();

const isChecked = ref<boolean>(props.isBookmarked);

const toggleBookmark = async () => {
  try {
    await postVideoBookmark({ video_id: props.videoId });

    if (!data.value?.success) alertStore.changeAlert({ open: true, error_code: data.value?.error_code || 'VIDEO_BOOKMARK_FAILED', error: data.value?.error || '문제가 발생하였습니다. 잠시 후 다시 시도해주세요.' });
    else isChecked.value = data.value.data.is_bookmarked;
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};
</script>

<template>
  <div :class="`bookmark-state-btn ${isChecked && 'is-bookmarked'}`" @click.stop="toggleBookmark">
    <button></button>
  </div>
</template>

<style lang="scss" scoped>
.bookmark-state-btn {
  width: 21px;
  height: 20px;
  cursor: pointer;

  button {
    width: 100%;
    height: 100%;

    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('@/shared/assets/star-default-icon.svg');
    transition: ease background-image 0.2s;
  }

  &:hover {
    button {
      background-image: url('@/shared/assets/star-hover-icon.svg');
    }
  }

  &.is-bookmarked {
    button {
      background-image: url('@/shared/assets/start-selected-icon.svg');
    }
  }
}
</style>
