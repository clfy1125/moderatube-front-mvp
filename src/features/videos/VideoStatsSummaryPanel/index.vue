<!-- (댓글관리 페이지)의 비디오 요약 정보 패널  -->
<script setup lang="ts">
import { onMounted } from 'vue';

import { useRoute } from 'vue-router';

import CommentCountCell from '@/features/comment/CommentCountCell/index.vue';
import VideoSpamBarChart from '@/features/spam/VideoSpamBarChart/index.vue';
import ThumbnailImg from '@/shared/components/Thumbnail/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';
import { formatKorNumber } from '@/shared/utils/formatKorNumber';

import { useGetVideo } from '../api/getVideo';

interface IVideoStatsSummaryPanelProps {}
defineProps<IVideoStatsSummaryPanelProps>();
defineOptions({ name: 'VideoStatsSummaryPanel' });
const emit = defineEmits<{ (e: 'on-get-video-info', reserveDelTime: string): void }>();

const route = useRoute();

const alertStore = useAlertStore();

const { refetch: getVideo, data: videoInfo } = useGetVideo({ video_id: route.params.id as string });

const handleGetVideo = async () => {
  try {
    await getVideo();
    if (videoInfo.value === undefined) return;

    // 자동 삭제 예약 시간
    if (videoInfo.value.data.video.auto_deletion_at) emit('on-get-video-info', videoInfo.value.data.video.auto_deletion_at);
  } catch (err) {
    alertStore.changeAlert({
      open: true,
      error_code: (err as Err).response.data.error_code,
      error: (err as Err).response.data.error
    });
  }
};

onMounted(handleGetVideo);
</script>

<template>
  <div class="video-stats-summary-panel">
    <div class="info-part">
      <ThumbnailImg :thumbnail-url="videoInfo?.data.video.thumbnail_url" />
      <div :title="videoInfo?.data.video_info.title" class="video-title">
        <p>{{ videoInfo?.data.video_info.title }}</p>
        <span>검사 댓글 / 총 댓글 수 (비율%)</span>
        <CommentCountCell :spam-review-count="videoInfo?.data.comment_stats.reviewed_comments" :comment-count="videoInfo?.data.video.comment_count" />
      </div>
    </div>

    <div class="chart-part">
      <div class="quick-desc">
        <div class="title">최근 스팸 댓글 개수</div>
        <div class="sub-title">최근 7일</div>
        <div class="spam">{{ formatKorNumber(videoInfo?.data.comment_stats.spam_comments_7days) }}</div>
      </div>
      <VideoSpamBarChart :daily-spam-stats="videoInfo?.data.comment_stats.daily_spam_stats" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.video-stats-summary-panel {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-top: 30px;
  height: 128px;

  .info-part {
    display: flex;
    gap: 19px;

    .thumbnail {
      flex-shrink: 0;
      width: 228px;
    }

    .video-title {
      display: flex;
      flex-direction: column;
      justify-content: center;

      p {
        margin-bottom: 10px;

        @include fontStyle(16px, 600, $gray_3);
      }

      span {
        height: 16px;

        @include fontStyle(11px, 400, $gray_a);
      }
    }
  }

  .chart-part {
    display: flex;
    gap: 40px;
    flex-shrink: 0;
    width: 526px;
    padding: 20px;
    border: 1px solid $gray_d;
    border-radius: 2px;

    .quick-desc {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;

      .title {
        margin-bottom: 4px;

        @include fontStyle(16px, 600, $gray_3);
      }

      .sub-title {
        @include fontStyle(12px, 400, $gray_7);
      }

      .spam {
        flex-grow: 1;
        align-content: end;
        text-align: center;

        @include fontStyle(24px, 700, $gray_3);
      }
    }
  }

  @include thirteenInchMonitor {
    display: block;
    height: unset;

    .info-part {
      margin-bottom: 20px;

      .thumbnail {
        height: 128px;
      }
    }

    .chart-part {
      width: 100%;
      height: 140px;
    }
  }

  @include mobile {
    margin-top: 20px;

    .info-part {
      gap: 10px;

      .thumbnail {
        width: 150px;
        height: 84px;
      }

      .video-title {
        justify-content: flex-start;

        p {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          white-space: wrap;
          padding-bottom: 2px;
          margin-bottom: 0;
          overflow: hidden;

          @include fontStyle(14px, 600, $gray_3, 106%);
        }
      }
    }

    .chart-part {
      flex-direction: column;
      gap: 10px;

      .quick-desc {
        flex-shrink: 0;
        flex-direction: row;
        align-items: center;

        .title {
          margin-bottom: 0;
          margin-right: 8px;
          font-size: 14px;
        }

        .spam {
          text-align: right;
          font-size: 18px;
        }
      }

      .echarts {
        flex-grow: 1;
      }
    }
  }
}
</style>
