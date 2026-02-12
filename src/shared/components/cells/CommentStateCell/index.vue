<script setup lang="ts">
import { ECommentOption } from '@/features/comment/SelectCommentOption/enum';

defineOptions({ name: 'CommentStateCell' });

interface ICommentStateProps {
  state?: ECommentOption;
}

const props = defineProps<ICommentStateProps>();
</script>

<template>
  <!-- 미분류 | 정상 | 스팸 -->
  <div class="comment-state-cell">
    <div :class="`text ${state}`">{{ state === ECommentOption.spam ? '스팸' : state === ECommentOption.normal ? '정상' : state === ECommentOption.new ? '미분류' : '' }}</div>
  </div>
</template>

<style lang="scss" scoped>
.comment-state-cell {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 46px;
    height: 19px;

    text-align: center;
    align-content: center;
    border: 1px solid;
    border-radius: 10px;
    border-color: $gray_a;

    @include fontStyle(11px, 600, $gray_a);

    &.new {
      color: $gray_a;
    }

    &.normal {
      color: $green;
      border-color: $green;
    }

    &.spam {
      color: $red;
      border-color: $red;
    }
  }
}
</style>
