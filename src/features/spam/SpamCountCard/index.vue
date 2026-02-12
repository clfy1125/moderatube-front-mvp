<!-- (대시보드 페이지)의 스팸 수 카드 -->
<script setup lang="ts">
import { formatKorNumber } from '@/shared/utils/formatKorNumber';

interface ISpamCountCardProps {
  title: string;
  subText: string;

  count?: number;
  amount?: number;
}
const props = withDefaults(defineProps<ISpamCountCardProps>(), {
  count: undefined,
  amount: undefined
});
defineOptions({ name: 'SpamCountCard' });

const signNumber = () => {
  /* amount값이 undefined라면 '-' 반환 */
  if (props.amount === undefined) return { type: 'NAN', value: '-' };

  const result = Math.sign(props.amount);
  /* amount값이 Nan이라면 '-' 반환 */
  if (Number.isNaN(result)) return { type: 'NAN', value: '-' };

  switch (result) {
    case 0:
      return { type: 'ZERO', value: '0%' };
    case 1:
      return { type: 'POSITIVE', value: `+${props.amount}%` };
    case -1:
      return { type: 'NEGATIVE', value: `${props.amount}%` };
    default:
      return { type: 'NAN', value: '-' };
  }
};
</script>

<template>
  <div class="spam-count-card">
    <div class="title">{{ title }}</div>
    <div class="count">{{ count !== undefined ? formatKorNumber(count) : '-' }}</div>
    <div class="sub-text">
      {{ subText }}
      <span :class="signNumber().type">{{ signNumber().value }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spam-count-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;

  @include tablet {
    padding: 14px;
    gap: 6px;
  }

  .title {
    flex: 1;
    @include fontStyle(16px, 600, $gray_3);

    @include tablet {
      font-size: 12px;
    }
  }

  .count {
    flex: 1;
    @include fontStyle(32px, 600, $gray_2);

    @include tablet {
      font-size: 16px;
    }
  }

  .sub-text {
    flex: 1;
    text-align: right;

    @include fontStyle(14px, 400, $gray_7);

    @include tablet {
      font-size: 11px;
    }

    .NAN,
    .ZERO {
      color: $gray_7;
    }

    .POSITIVE {
      color: $red;
    }

    .NEGATIVE {
      color: $green;
    }
  }
}
</style>
