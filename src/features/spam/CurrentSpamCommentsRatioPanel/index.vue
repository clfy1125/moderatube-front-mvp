<!-- (대시보드 페이지)의 최근 스팸 댓글 비율 리스트 -->
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { useGetSpamRatio } from '@/features/channel/api/getSpamRatio';
import ChannelSpamBarChart from '@/features/spam/ChannelSpamBarChart/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { useChannelIdStore } from '@/shared/store/useChannelIdStore';
import { Err } from '@/shared/types/Error';
import { formatDate } from '@/shared/utils/formatDate';

defineOptions({ name: 'CurrentSpamCommentsRatioPanel' });

const channelIdStore = useChannelIdStore();
const alertStore = useAlertStore();

const { mutateAsync: getSpamRatio, data: spamRatio } = useGetSpamRatio();

const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

const handleGetSpamRatio = async () => {
  if (!channelIdStore.channelId) return;

  try {
    await getSpamRatio({ channel_id: channelIdStore.channelId });
    if (spamRatio.value === undefined) return;

    const daily_data_arr = spamRatio.value.data.daily_data;
    startDate.value = daily_data_arr[0].date;
    endDate.value = daily_data_arr[daily_data_arr.length - 1].date;
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};

watch(() => channelIdStore.channelId, handleGetSpamRatio);
onMounted(handleGetSpamRatio);
</script>

<template>
  <div class="current-spam-ratio-panel">
    <div class="header">
      <div class="title">최근 스팸 댓글 비율</div>
      <div v-if="startDate && endDate" class="sub-text">{{ formatDate(startDate) }} ~ {{ formatDate(endDate) }}</div>
    </div>
    <ChannelSpamBarChart :daily-data="spamRatio?.data.daily_data || []" />
  </div>
</template>

<style lang="scss">
.current-spam-ratio-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 40px 30px;

  @include tablet {
    padding: 24px;
    gap: 10px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;

    .title {
      @include fontStyle(16px, 600, $gray_3);

      @include tablet {
        font-size: 12px;
      }
    }

    .sub-text {
      @include fontStyle(12px, 400, $gray_7);

      @include tablet {
        font-size: 11px;
      }
    }
  }

  .bar-chart {
    flex: 1;

    width: auto;
    height: auto;
  }
}
</style>
