<script setup lang="ts">
import DateCell from '@/shared/components/cells/DateCell/index.vue';
import TextCell from '@/shared/components/cells/TextCell/index.vue';
import { formatKorNumber } from '@/shared/utils/formatKorNumber';

import { ECreditTransactionType, IGetCreditHistoryRes } from '../api/getCreditHistory';

interface ICreditHistoryTableProps {
  items: IGetCreditHistoryRes['data']['results'];
}

defineProps<ICreditHistoryTableProps>();
defineOptions({ name: 'CreditHistoryTable' });
const emit = defineEmits<{ (e: 'on-scroll-table', value: number): void }>();

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  const scrollLeft = target.scrollLeft;

  emit('on-scroll-table', scrollLeft);
};

const formatTransactionType = (type: ECreditTransactionType) => {
  switch (type) {
    case ECreditTransactionType.purchase:
      return '구매';
    case ECreditTransactionType.usage:
      return '사용';
    case ECreditTransactionType.refund:
      return '환불';
    case ECreditTransactionType.bonus:
      return '보너스';
    case ECreditTransactionType.adjustment:
      return '조정';
    default:
      return '-';
  }
};
</script>

<template>
  <div class="credit-history-table" @scroll="handleScroll">
    <!-- 헤더 -->
    <div class="t-head">
      <div>ID</div>
      <div>일시</div>
      <div>구분</div>
      <div>내용</div>
      <div>변동</div>
      <div>이전 잔액</div>
      <div>이후 잔액</div>
    </div>

    <!-- 바디 -->
    <ul class="t-body">
      <li v-for="(item, index) in items" :key="index" class="row">
        <TextCell :text="`${item.id}`" />
        <DateCell :date="item.created_at" />
        <TextCell :text="formatTransactionType(item.transaction_type)" />
        <TextCell :text="item.description" />
        <TextCell :text="`${formatKorNumber(item.amount)}`" />
        <TextCell :text="`${formatKorNumber(item.balance_before)}`" />
        <TextCell :text="`${formatKorNumber(item.balance_after)}`" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.credit-history-table {
  margin-top: 30px;
  margin-bottom: 20px;

  @include tablet {
    margin-top: 20px;
    overflow: auto;
  }

  @include mobile {
    margin-bottom: 14px;
  }

  .t-head {
    display: flex;
    align-items: center;
    height: 29px;
    margin-bottom: 6px;

    @include fontStyle(11px, 600, $gray_3);

    @include mobile {
      width: max-content;
    }

    & > div {
      flex: 1;
      height: 100%;
      align-content: center;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      border-bottom: 1px solid $gray_e;
      overflow: hidden;
      &:nth-of-type(1),
      &:nth-of-type(2),
      &:nth-of-type(3) {
        min-width: 80px;
        max-width: 80px;
      }

      &:nth-of-type(4) {
        flex: 1;

        @include tablet {
          min-width: 180px;
        }

        @include mobile {
          max-width: 180px;
        }
      }

      &:nth-of-type(5),
      &:nth-of-type(6),
      &:last-of-type {
        min-width: 90px;
        max-width: 90px;
      }
    }
  }

  .t-body {
    margin-bottom: 8px;

    .row {
      display: flex;
      height: 32px;
      align-items: center;

      &:nth-of-type(even) {
        background-color: $gray_f9;
      }

      @include mobile {
        width: fit-content;
        height: 24px;
      }

      & > div {
        flex-shrink: 0;
        flex: 1;
        height: fit-content;
        align-content: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        line-height: 100%;

        &:nth-of-type(1),
        &:nth-of-type(2),
        &:nth-of-type(3) {
          min-width: 80px;
          max-width: 80px;
        }

        &:nth-of-type(4) {
          flex: 1;

          @include tablet {
            min-width: 180px;
          }

          @include mobile {
            max-width: 180px;
          }
        }

        &:nth-of-type(5),
        &:nth-of-type(6),
        &:last-of-type {
          min-width: 90px;
          max-width: 90px;
        }

        @include mobile {
          min-width: 100px;
          max-width: 100px;
        }

        &.date-cell {
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
