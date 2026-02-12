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
defineOptions({ name: 'MobileSize' });
</script>

<!-- 모바일 사이즈 -->
<template>
  <div class="videos-table-mobile-size">
    <div class="t-head">
      <CheckBox id="videos-table-head-checkbox" :model-value="items.length > 0 && items.length === checkedIds.length" @update:model-value="(state: boolean) => $emit('on-toggle-head-checkbox', state)" />
      <div>썸네일</div>
      <div>정보</div>
    </div>

    <IsPending v-if="isPending" />
    <ul v-else class="t-body">
      <li v-for="(item, index) in items" :key="item.id" :class="`row ${checkedIds.includes(item.video_id) && 'active'}`" @click="() => $emit('on-select-video', item)">
        <div class="checkbox-and-number" @click.stop="() => {}">
          <CheckBox :id="item.id.toString()" :model-value="checkedIds.includes(item.video_id)" @update:model-value="(state: boolean) => $emit('on-toggle-row-checkbox', item.video_id, state)" />
          <TextCell :text="(offset + index + 1).toString()" />
        </div>
        <ThumbnailImg :thumbnail-url="item.thumbnail_url" />
        <div class="info">
          <div class="info-title">
            <TextCell :text="item.title" />
            <BookmarkStateBtn :video-id="item.video_id" :is-bookmarked="item.is_bookmarked" />
          </div>
          <div class="info-sub-text">
            <DateCell :date="item.published_at" />
            <TextCell :text="formatCompactNumber(item.view_count)" />
          </div>
          <CommentCountCell :spam-review-count="item.spam_review_count" :comment-count="item.comment_count" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
/* 모바일 사이즈 */
.videos-table-mobile-size {
  display: none;

  @include tablet {
    display: block;

    .is-pending {
      display: flex;
      justify-content: center;
      padding-top: 60px;
      padding-bottom: 60px;
    }

    .t-head,
    .row {
      display: flex;

      & > div {
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;

        &:nth-of-type(1) {
          min-width: 30px;
          max-width: 30px;
        }

        &:nth-of-type(2) {
          min-width: 121px;
          max-width: 121px;
        }

        &:last-of-type {
          flex-grow: 1;
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
        &:nth-of-type(even) {
          background-color: $gray_f9;
        }

        &.active,
        &:hover {
          background-color: $gray_e;
        }

        .checkbox-and-number {
          flex-shrink: 0;
          padding-top: 8px;
          padding-bottom: 8px;

          .text-cell {
            text-align: center;
            margin-top: 8px;
          }
        }

        .thumbnail {
          height: 84px;
          padding-top: 8px;
          padding-bottom: 8px;
        }

        .info {
          padding: 14px 10px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          // border: 1px solid red;

          & > div {
            display: flex;
            align-items: center;

            &.info-title {
              position: relative;
              height: 14px;

              .bookmark-state-btn {
                position: absolute;
                top: -14px;
                left: -10px;
                flex-shrink: 0;
                width: 36px;
                height: 44px;

                button {
                  position: relative;
                  top: 11px;
                  right: 3px;
                  width: 14px;
                  height: 14px;
                  background-size: contain;
                }
              }

              .text-cell {
                padding-left: 14px;

                @include fontStyle(12px, 600, $gray_3);
              }
            }

            &.info-sub-text {
              display: flex;
              align-items: center;
              gap: 12.5px;
              height: 20px;

              & > div {
                @include fontStyle(11px, 400, $gray_a);

                &.text-cell {
                  height: fit-content;
                  padding-left: 0;
                  padding-right: 0;
                  align-content: center;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
