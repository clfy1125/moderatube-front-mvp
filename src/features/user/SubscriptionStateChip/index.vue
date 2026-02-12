<script setup lang="ts">
import { onMounted } from 'vue';

import RegisterSubscriptionCard from '@/features/user/RegisterSubscriptionCard/index.vue';
import PlanChip from '@/pages/Profile/PlanChip/index.vue';
import IsPending from '@/shared/components/IsPending/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';

import { useGetSubscription } from '../api/getSubsciption';

interface ISubscriptionStateChipProps {
  /* ... */
}

defineProps<ISubscriptionStateChipProps>();
defineOptions({ name: 'SubscriptionStateChip' });

const alertStore = useAlertStore();

const { refetch: getSubscription, data: subscriptionState, isLoading, isError } = useGetSubscription();

const handleGetSubsription = async () => {
  try {
    await getSubscription();
    if (subscriptionState.value === undefined) return;
  } catch (err) {
    alertStore.changeAlert({
      open: true,
      error: (err as Err).response.data.error,
      error_code: (err as Err).response.data.error_code
    });
  }
};

onMounted(handleGetSubsription);
</script>

<template>
  <IsPending v-if="isLoading" />
  <div v-else class="subscription-state-chip">
    <!-- 등록된 자동충전이 있다면 -->
    <PlanChip v-if="subscriptionState?.data && !isError" />

    <!-- 등록된 자동충전이 없다면 -->
    <RegisterSubscriptionCard v-else />
  </div>
</template>

<style lang="scss" scoped>
.subscription-state-chip {
  display: flex;
}
</style>
