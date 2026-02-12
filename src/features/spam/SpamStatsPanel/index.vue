<script setup lang="ts">
import { onMounted, watch } from 'vue';

import { useGetSpamStatistics } from '@/features/channel/api/getSpamStatistics';
import SpamCountCard from '@/features/spam/SpamCountCard/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { useChannelIdStore } from '@/shared/store/useChannelIdStore';
import { Err } from '@/shared/types/Error';

defineOptions({ name: 'SpamStatsPanel' });

const channelIdStore = useChannelIdStore();
const alertStore = useAlertStore();

const { mutateAsync: getSpamStatistics, data: spamStatistics } = useGetSpamStatistics();

const handleGetSpamStatistics = async () => {
  if (!channelIdStore.channelId) return;

  try {
    await getSpamStatistics({ channel_id: channelIdStore.channelId });
    if (spamStatistics.value === undefined) return;
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};

watch(() => channelIdStore.channelId, handleGetSpamStatistics);
onMounted(handleGetSpamStatistics);
</script>

<template>
  <div class="spam-stats-panel">
    <SpamCountCard :title="'오늘 스팸 수'" sub-text="어제 대비" :count="spamStatistics?.data.today.count" :amount="spamStatistics?.data.today.change_percentage" />
    <SpamCountCard :title="'이번 주 스팸 수'" sub-text="지난 주 대비" :count="spamStatistics?.data.this_week.count" :amount="spamStatistics?.data.this_week.change_percentage" />
    <SpamCountCard :title="'이번 달 스팸 수'" sub-text="지난 달 대비" :count="spamStatistics?.data.this_month.count" :amount="spamStatistics?.data.this_month.change_percentage" />
    <SpamCountCard :title="'3개월 간 스팸 수'" sub-text="지난 3개월 대비" :count="spamStatistics?.data.three_months.count" :amount="spamStatistics?.data.three_months.change_percentage" />
  </div>
</template>

<style lang="scss" scoped>
.spam-stats-panel {
  flex: 1;
  display: flex;

  @include tablet {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .spam-count-card {
    border-bottom: 1px solid $gray_d;

    &:not(:last-of-type) {
      border-right: 1px solid $gray_d;

      @include tablet {
        &:nth-of-type(2) {
          border-right: none;
        }
      }
    }
  }
}
</style>
