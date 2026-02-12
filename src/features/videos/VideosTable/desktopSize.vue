<script setup lang="ts">
import CommentCountCell from '@/features/comment/CommentCountCell/index.vue';
import BookmarkStateBtn from '@/shared/components/btns/BookmarkStateBtn/index.vue';
import DateCell from '@/shared/components/cells/DateCell/index.vue';
import TextCell from '@/shared/components/cells/TextCell/index.vue';
import CheckBox from '@/shared/components/inputs/CheckBox/index.vue';
import IsPending from '@/shared/components/IsPending/index.vue';
import ThumbnailImg from '@/shared/components/Thumbnail/index.vue';
import { formatCompactNumber } from '@/shared/utils/formatCompactNumber';

import { VideosTableCommonEmits } from './utils/videoTableCommonEmits';
import { IVideoTableCommonProps } from './utils/videoTableCommonProps';

defineProps<IVideoTableCommonProps>();
defineEmits<VideosTableCommonEmits>();
defineOptions({ name: 'DesktopSize' });
</script>

<!-- 웹 사이즈 -->
<template>
  <div class="videos-table">
    <div class="t-head">
      <CheckBox id="videos-table-head-checkbox" :model-value="items.length > 0 && items.length === checkedIds.length" @update:model-value="(state: boolean) => $emit('on-toggle-head-checkbox', state)" />
      <div>번호</div>
      <div>관심</div>
      <div>썸네일</div>
      <div>영상제목</div>
      <div>업로드일</div>
      <div>조회수</div>
      <div>검사 댓글 / 총 댓글 수</div>
    </div>

    <IsPending v-if="isPending" />
    <ul v-else class="t-body">
      <li v-for="(item, index) in items" :key="item.id" :class="`row ${checkedIds.includes(item.video_id) && 'active'}`" @click="() => $emit('on-select-video', item)">
        <CheckBox :id="item.id.toString()" :model-value="checkedIds.includes(item.video_id)" @update:model-value="(state: boolean) => $emit('on-toggle-row-checkbox', item.video_id, state)" />
        <TextCell :text="(offset + index + 1).toString()" />
        <BookmarkStateBtn :video-id="item.video_id" :is-bookmarked="item.is_bookmarked" />
        <ThumbnailImg :thumbnail-url="item.thumbnail_url" />
        <TextCell :text="item.title" />
        <DateCell :date="item.published_at" />
        <TextCell :text="formatCompactNumber(item.view_count)" />
        <CommentCountCell :spam-review-count="item.spam_review_count" :comment-count="item.comment_count" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
/* 데스크탑 사이즈 */
.videos-table {
  .t-head,
  .row {
    display: flex;

    & > div {
      min-width: 50px;
      align-content: center;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;

      &:nth-of-type(4) {
        min-width: 141px;
        max-width: 141px;
      }

      &:nth-of-type(5) {
        flex-grow: 1;
      }

      &:nth-of-type(6),
      &:nth-of-type(7) {
        min-width: 67px;
        max-width: 67px;
      }

      &:last-of-type {
        min-width: 100px;
        max-width: 100px;
      }
    }
  }

  .t-head {
    height: 29px;
    border-bottom: 1px solid $gray_e;
    margin-bottom: 6px;

    @include fontStyle(11px, 600, $gray_3);

    & > div {
      align-content: center;
    }
  }

  .t-body {
    .row {
      height: 84px;
      // cursor: pointer;

      &:nth-of-type(even) {
        background-color: $gray_f9;
      }

      &.active,
      &:hover {
        background-color: $gray_e;
      }

      .checkbox {
        position: relative;
        top: 26px;
        height: 32px;
      }

      .bookmark-state-btn {
        position: relative;
        top: 31.5px;
      }

      .thumbnail {
        padding: 8px 10px;
      }

      & > div {
        &:nth-of-type(5) {
          text-align: left;

          font-weight: 600;
        }
      }
    }
  }

  @include tablet {
    display: none;
  }
}
</style>
