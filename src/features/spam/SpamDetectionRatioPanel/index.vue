<!-- (대시보드 페이지)의 위험도 파이차트 패널 -->
<script setup lang="ts">
import { onMounted, watch } from 'vue';

import { useGetRiskAnalysis } from '@/features/channel/api/getRiskAnalysis';
import SpamPieChart from '@/features/spam/SpamPieChart/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { useChannelIdStore } from '@/shared/store/useChannelIdStore';
import { Err } from '@/shared/types/Error';

defineOptions({ name: 'SpamDetectionRatioPanel' });

const channelIdStore = useChannelIdStore();
const alertStore = useAlertStore();

const { mutateAsync: getRiskAnalysis, data: risk } = useGetRiskAnalysis();

const handleGetRiskAnalysis = async () => {
  if (!channelIdStore.channelId) return;

  try {
    await getRiskAnalysis({ channel_id: channelIdStore.channelId });
    if (risk.value === undefined) return;
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};

const riskClassify = () => {
  if (risk.value === undefined)
    return {
      title: '-',
      notice: '-'
    };

  switch (risk.value.data.risk_classification) {
    case 'clean':
    case 'low':
      return {
        title: '낮음',
        notice: '위험도가 낮습니다.'
      };
    case 'medium':
      return {
        title: '중간',
        notice: '적절한 관리가 필요합니다.'
      };
    case 'high':
      return {
        title: '높음',
        notice: '빠른 시일 내 검사가 필요합니다.'
      };
    default:
      return {
        title: '-',
        notice: '-'
      };
  }
};

watch(() => channelIdStore.channelId, handleGetRiskAnalysis);
onMounted(handleGetRiskAnalysis);
</script>

<template>
  <div class="spam-detection-ratio-panel">
    <div class="header">
      <div class="title">
        위험도
        <span class="title-sub-text">최근 7일</span>
      </div>
      <div class="sub-text">
        <p>{{ riskClassify().notice }}</p>
        <div :class="`state ${risk?.data.risk_classification || ''}`">{{ riskClassify().title }}</div>
      </div>
    </div>
    <SpamPieChart
      :comments="{
        reviewedComments: risk?.data.reviewed_comments,
        unreviewedComments: risk?.data.unreviewed_comments
      }"
    />
  </div>
</template>

<style lang="scss">
.spam-detection-ratio-panel {
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

    @include tablet {
      align-items: center;
    }

    .title {
      display: flex;
      gap: 6px;

      @include fontStyle(16px, 600, $gray_3);

      @include tablet {
        font-size: 12px;
      }

      .title-sub-text {
        margin-top: 2px;

        @include fontStyle(12px, 600, $gray_7);

        @include tablet {
          margin-top: 0px;
        }
      }
    }

    .sub-text {
      display: flex;
      align-items: center;
      gap: 10px;

      @include tablet {
        gap: 4px;
      }

      p {
        @include fontStyle(12px, 400, $gray_7);

        @include tablet {
          font-size: 11px;
        }
      }

      .state {
        padding: 4px 20px;
        border-radius: 2px;
        border: 1px solid;

        @include fontStyle(14px, 600);

        @include tablet {
          padding-left: 14px;
          padding-right: 14px;
          font-size: 12px;
        }

        &.clean,
        &.low {
          color: $green;
          border-color: $green;
        }

        &.medium {
          color: $medium_red;
          border-color: $medium_red;
        }

        &.high {
          color: $red;
          border-color: $red;
        }
      }
    }
  }

  .pie-chart {
    flex: 1;

    width: auto;
    height: auto;
  }
}
</style>
