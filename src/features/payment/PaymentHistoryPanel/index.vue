<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import BasePagination from '@/shared/components/BasePagination/index.vue';
import IOSScrollHint from '@/shared/components/IOSScrollHint/index.vue';
import IsPending from '@/shared/components/IsPending/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';

import { IGetPaymentHistoryRes, useGetPaymentHistory } from '../api/getPaymentHistory';
import PaymentHistoryTable from '../PaymentHistoryTable/index.vue';

defineOptions({ name: 'PaymentHistoryPanel' });

const alertStore = useAlertStore();

const { mutateAsync: getPaymentHistory, data: paymentHistory, isPending: pendingGetPaymentHistory } = useGetPaymentHistory();

const tableScrollLeft = ref(0);

const queryParams = reactive({ page: 1 });
const items = ref<IGetPaymentHistoryRes['data']['results']>([]);

const onSelectPage = (newPage: number) => {
  queryParams.page = newPage;
  handleGetPaymentHistory();
};

const handleGetPaymentHistory = async () => {
  try {
    await getPaymentHistory(queryParams);
    if (paymentHistory.value === undefined) return;
    items.value = paymentHistory.value.data.results;
  } catch (err) {
    alertStore.changeAlert({
      open: true,
      error: (err as Err).response.data.error,
      error_code: (err as Err).response.data.error_code
    });
  }
};

onMounted(handleGetPaymentHistory);
</script>

<template>
  <div class="payment-history-panel">
    <IsPending v-if="pendingGetPaymentHistory" />
    <div v-else>
      <PaymentHistoryTable :items="items" @on-scroll-table="(scrollLeft) => (tableScrollLeft = scrollLeft)" />
      <IOSScrollHint :hidden="tableScrollLeft > 5" />
    </div>

    <BasePagination v-if="items.length > 0 && !pendingGetPaymentHistory" v-model:current-page="queryParams.page" :total="paymentHistory?.data.pagination.total_pages || 1" @on-select-page="onSelectPage" />
  </div>
</template>

<style lang="scss">
.payment-history-panel {
  position: relative;
  border: 1px solid $gray_d;
  padding: 0px 30px 40px 30px;

  @include tablet {
    padding: 0px 24px 24px 24px;
  }

  @include mobile {
    border-color: transparent;
    padding: 0;
  }

  .ios-scroll-hint {
    top: 0;
    right: -1px;
  }
}

.pagination {
  ul {
    justify-content: end;
  }
}
</style>
