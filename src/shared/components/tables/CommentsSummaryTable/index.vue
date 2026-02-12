<!-- (대시보드 페이지)의 하단부 "신규댓글,관심영상댓글 테이블" 공용 컴포넌트 -->
<script setup lang="ts">
import { useRouter } from 'vue-router';

import { CommentSummaryItem } from '@/features/comment/types/CommentSummaryItem';
import CommentStateCell from '@/shared/components/cells/CommentStateCell/index.vue';
import DateCell from '@/shared/components/cells/DateCell/index.vue';
import LikesCell from '@/shared/components/cells/LikesCell/index.vue';
import TextCell from '@/shared/components/cells/TextCell/index.vue';
import WriterCell from '@/shared/components/cells/WriterCell/index.vue';

export interface ICommentsSummaryTableProps {
  items: CommentSummaryItem[];
}

defineProps<ICommentsSummaryTableProps>();
const emit = defineEmits<{ (e: 'on-scroll-table', value: number): void }>();
defineOptions({ name: 'CommentsSummaryTable' });

const router = useRouter();

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  const scrollLeft = target.scrollLeft;

  emit('on-scroll-table', scrollLeft);
};

const goToCommentManagement = (item: CommentSummaryItem) => router.push({ name: 'CommentManagement', params: { id: item.video_id } });
</script>

<template>
  <div class="comments-summary-table" @scroll="handleScroll">
    <!-- 헤더 -->
    <div class="t-head">
      <div>영상제목</div>
      <div>작성자</div>
      <div>댓글 내용</div>
      <div>날짜</div>
      <div>좋아요</div>
      <div>상태</div>
    </div>

    <!--　바디 -->
    <ul class="t-body">
      <li v-for="(item, index) in items" :key="index" class="row" @click="goToCommentManagement(item)">
        <TextCell :text="item.video_title" />
        <!-- 작성자 프로필 url -->
        <WriterCell :name="item.author_display_name" :author-profile-image-url="item.author_profile_image_url" />

        <TextCell :text="item.text_display" />
        <DateCell :date="item.published_at" />
        <LikesCell :count="item.like_count" />
        <CommentStateCell :state="item.type" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.comments-summary-table {
  margin: 0 30px 40px 30px;
  margin-bottom: 10px;
  position: relative;

  @include tablet {
    margin: 0 24px 24px 24px;
  }

  @include mobile {
    margin-bottom: 10px;
    overflow: scroll hidden;
  }

  .t-head {
    display: flex;
    align-items: center;
    height: 29px;
    margin-bottom: 8px;

    @include fontStyle(11px, 600, $gray_3);

    @include mobile {
      width: max-content;
    }

    & > div {
      height: 100%;
      align-content: center;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      border-bottom: 1px solid $gray_e;
      overflow: hidden;

      &:nth-of-type(1) {
        flex: 2.5;

        @include tablet {
          min-width: 98px;
          max-width: 98px;
        }
      }

      &:nth-of-type(2) {
        min-width: 135px;
        max-width: 135px;

        @include mobile {
          min-width: 119px;
          max-width: 119px;
        }
      }

      &:nth-of-type(3) {
        flex: 7.5;

        @include mobile {
          min-width: 105px;
          max-width: 105px;
        }
      }

      &:nth-of-type(4),
      &:nth-of-type(5) {
        min-width: 67px;
        max-width: 67px;
      }

      &:last-of-type {
        min-width: 58px;
        max-width: 58px;
      }
    }
  }

  .t-body {
    height: 160px; // 비어있어도 고정 높이유지

    @include mobile {
      height: 120px;
      margin-bottom: 8px;
    }

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
        min-width: 67px;
        align-content: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;

        &:nth-of-type(1) {
          flex: 2.5;

          @include tablet {
            min-width: 98px;
            max-width: 98px;
          }
        }

        &:nth-of-type(2) {
          flex: 7.5;

          @include mobile {
            min-width: 105px;
            max-width: 105px;
          }
        }

        &:nth-of-type(3),
        &:nth-of-type(4) {
          min-width: 67px;
          max-width: 67px;
        }

        &:last-of-type {
          min-width: 58px;
          max-width: 58px;
        }
      }

      & > span {
        min-width: 135px;
        max-width: 135px;

        @include mobile {
          min-width: 119px;
          max-width: 119px;
        }
      }

      &:hover {
        border-radius: 2px;
        background-color: $gray_e;
      }
    }
  }
}
</style>
