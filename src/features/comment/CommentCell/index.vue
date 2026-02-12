<script setup lang="ts">
interface ICommentCellProps {
  content: string;
  isCommentThread?: boolean;
}

withDefaults(defineProps<ICommentCellProps>(), { isCommentThread: true });
defineOptions({ name: 'CommentCell' });
</script>

<template>
  <div class="comment-cell">
    <div v-if="!isCommentThread" class="reply-icon"></div>
    <span :title="content">{{ content }}</span>
  </div>
</template>

<style lang="scss" scoped>
.comment-cell {
  display: flex;
  gap: 2px;
  padding-left: 10px;
  padding-right: 10px;

  @include tablet {
    padding-left: 4px;
    padding-right: 4px;
  }

  @include fontStyle(12px, 400, $gray_3);

  .reply-icon {
    flex-shrink: 0;
    width: 14px;

    background-repeat: no-repeat;
    background-position: center;
    background-image: url('@/shared/assets/reply-icon.svg');
  }

  span {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 16px;
    padding: 2px 0;
    white-space: pre-line;

    overflow: hidden;
    align-content: center;

    @include tablet {
      -webkit-line-clamp: 2;
    }

    @include mobile {
      -webkit-line-clamp: 1;
    }
  }
}
</style>
