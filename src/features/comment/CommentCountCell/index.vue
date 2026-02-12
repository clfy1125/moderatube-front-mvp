<script setup lang="ts">
import { calcPercentage } from '@/shared/utils/calcPercentage';

interface ICommentCountCellProps {
  spamReviewCount?: number;
  commentCount?: number;
}

defineProps<ICommentCountCellProps>();
defineOptions({ name: 'CommentCountCell' });
</script>

<template>
  <div class="comment-count-cell">
    <div class="comment-icon"></div>
    <span>{{ spamReviewCount ?? '-' }} / {{ commentCount ?? '-' }} ({{ calcPercentage(spamReviewCount, commentCount) }}) </span>
  </div>
</template>

<style lang="scss" scoped>
.comment-count-cell {
  display: flex;
  align-items: center;
  gap: 4px;

  .comment-icon {
    width: 10px;
    height: 10px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: url('@/shared/assets/comment-icon.svg');
  }

  span {
    @include fontStyle(11px, 400, $gray_3, 102%);
  }
}
</style>
