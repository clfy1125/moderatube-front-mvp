<!-- 메인 홈(대시보드) 위젯 -->
<script setup lang="ts">
import ChannelInfoSummaryChip from '@/features/channel/ChannelInfoSummaryChip/index.vue';
import BookmarkCommentsPanel from '@/features/comment/BookmarkCommentsPanel/index.vue';
import NewCommentsPanel from '@/features/comment/NewCommentsPanel/index.vue';
import CurrentSpamCommentsRatioPanel from '@/features/spam/CurrentSpamCommentsRatioPanel/index.vue';
import SpamDetectionRatioPanel from '@/features/spam/SpamDetectionRatioPanel/index.vue';
import SpamStatsPanel from '@/features/spam/SpamStatsPanel/index.vue';
import PageFooter from '@/shared/components/Footer/index.vue';

defineOptions({ name: 'DashboardWidget' });
</script>

<template>
  <div class="dashboard-widget">
    <ChannelInfoSummaryChip />

    <div class="panel-part">
      <SpamStatsPanel />
      <div class="chart-part">
        <CurrentSpamCommentsRatioPanel />
        <SpamDetectionRatioPanel />
      </div>
      <NewCommentsPanel />
      <BookmarkCommentsPanel />
    </div>

    <PageFooter />
  </div>
</template>

<style lang="scss" scoped>
.dashboard-widget {
  max-width: 1290px;
  padding: 30px 40px;

  @include tablet {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 4%;
    padding-right: 4%;
  }

  .panel-part {
    border: 1px solid $gray_d;
    border-radius: 2px;
  }

  .chart-part {
    display: flex;
    height: 330px;

    @include tablet {
      flex-direction: column;
      height: 600px;
    }

    @include mobile {
      height: 404px;
    }

    & > div {
      border-bottom: 1px solid $gray_d;

      &:not(:last-of-type) {
        border-right: 1px solid $gray_d;

        @include tablet {
          border-right: none;
        }
      }
    }
  }
}
</style>
