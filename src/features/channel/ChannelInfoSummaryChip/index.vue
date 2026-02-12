<!-- (대시보드 페이지)의 채널 요약정보  -->
<script setup lang="ts">
import { onMounted, watch } from 'vue';

import { useAlertStore } from '@/shared/store/useAlertStore';
import { useChannelIdStore } from '@/shared/store/useChannelIdStore';
import { Err } from '@/shared/types/Error';
import { formatCompactNumber } from '@/shared/utils/formatCompactNumber';
import { formatKorNumber } from '@/shared/utils/formatKorNumber';

import { useGetChannelInfo } from '../api/getChannelInfo';

defineOptions({ name: 'ChannelInfoSummaryChip' });

const alertStore = useAlertStore();
const channelIdStore = useChannelIdStore();

const { mutateAsync: getChannelInfo, data: channelInfo } = useGetChannelInfo();

const handleGetChannelInfo = async () => {
  if (!channelIdStore.channelId) return;

  try {
    await getChannelInfo({ channel_id: channelIdStore.channelId });
    if (channelInfo.value === undefined) return;
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};

watch(() => channelIdStore.channelId, handleGetChannelInfo);
onMounted(handleGetChannelInfo);
</script>

<template>
  <div class="channel-info-summary-chip">
    <div class="main-part">
      <div class="channel-icon"></div>
      <span class="name">{{ channelInfo?.data.title }}</span>
    </div>

    <div class="sub-part">
      <div class="channel-sub-info-card">
        <div>
          <div class="icon icon-subscriber"></div>
          <p>구독자</p>
        </div>
        <span>{{ formatCompactNumber(channelInfo?.data.subscriber_count) }}</span>
      </div>
      <div class="channel-sub-info-card">
        <div>
          <div class="icon icon-not-allowed"></div>
          <p>누적 스팸 처리 댓글</p>
        </div>
        <span>{{ channelInfo?.data.reviewed_comments !== undefined ? `${formatKorNumber(channelInfo?.data.reviewed_comments)}개` : '-' }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.channel-info-summary-chip {
  display: flex;
  justify-content: space-between;
  height: 29px;
  padding-left: 10px;
  margin-bottom: 20px;

  @include tablet {
    display: block;
    height: 46px;
    margin-bottom: 30px;
  }

  .main-part {
    flex-grow: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    overflow: hidden;

    .channel-icon {
      flex-shrink: 0;
      width: 28px;
      height: 20px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      background-image: url('@/shared/assets/channel-icon.svg');

      @include tablet {
        width: 24px;
        height: 17px;
      }
    }

    .name {
      padding-right: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @include fontStyle(24px, 700, $key_color);

      @include tablet {
        font-size: 18px;
      }
    }
  }

  .sub-part {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 30px;

    @include tablet {
      margin-top: 12px;
      gap: unset;
    }

    .channel-sub-info-card {
      display: flex;
      align-content: center;
      gap: 8px;

      @include tablet {
        gap: 6px;
      }

      & > div {
        display: flex;
        gap: 8px;

        @include tablet {
          gap: 6px;
        }

        .icon {
          flex-shrink: 0;
          width: 14px;
          height: 14px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;

          &-subscriber {
            background-image: url('@/shared/assets/subscriber-icon.svg');
          }

          &-not-allowed {
            background-image: url('@/shared/assets/not-allowed-icon.svg');
          }

          @include tablet {
            width: 11px;
            height: 11px;
          }
        }

        p {
          @include fontStyle(14px, 600, $gray_3);

          @include tablet {
            font-size: 11px;
          }
        }
      }

      span {
        min-width: 52px;
        @include fontStyle(14px, 600, $gray_3);

        @include tablet {
          min-width: 42px;
          font-size: 11px;
        }
      }
    }
  }
}
</style>
