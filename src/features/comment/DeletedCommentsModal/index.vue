<script setup lang="ts">
import { watch, reactive, ref } from 'vue';

import { useRoute } from 'vue-router';

import BasePagination from '@/shared/components/BasePagination/index.vue';
import CloseModalBtn from '@/shared/components/btns/CloseModalBtn/index.vue';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import DateCell from '@/shared/components/cells/DateCell/index.vue';
import LikesCell from '@/shared/components/cells/LikesCell/index.vue';
import TextCell from '@/shared/components/cells/TextCell/index.vue';
import WriterCell from '@/shared/components/cells/WriterCell/index.vue';
import IsPending from '@/shared/components/IsPending/index.vue';
import { IModalProps } from '@/shared/components/modals/BaseModal/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { useChannelIdStore } from '@/shared/store/useChannelIdStore';
import { Err } from '@/shared/types/Error';

import { useGetComments } from '../api/getComments';
import { usePostVideoIdCommentsSync } from '../api/postVideoIdCommentsSync';
import { ECommentOption } from '../SelectCommentOption/enum';
import { DeletedCommentItem } from '../types/DeletedCommentItem';

interface IDeletedCommentsModalProps extends IModalProps {}

const channelIdStore = useChannelIdStore();

const props = defineProps<IDeletedCommentsModalProps>();
defineEmits(['close']);
defineOptions({ name: 'DeletedCommentsModal' });

const route = useRoute();
const alertStore = useAlertStore();

const { mutateAsync: postVideoIdCommentsSync, data: synced, isPending: pendingVideoIdCommentsSync } = usePostVideoIdCommentsSync(route.params.id as string);
const { mutateAsync: getVideoComments, data: videoComments, isPending: pendingVideoComments } = useGetComments();

const items = ref<DeletedCommentItem[]>([]);

const queryParams = reactive({
  channel_id: channelIdStore.channelId,
  page: 1,
  page_size: 10,
  type: ECommentOption.deleted,
  video_id: route.params.id as string
});

const onSelectPage = (newPage: number) => {
  queryParams.page = newPage;
  handleGetVideoIdDeletedComments();
};

const handleGetVideoIdDeletedComments = async () => {
  try {
    await postVideoIdCommentsSync();
    if (synced.value === undefined) return;

    await getVideoComments(queryParams);
    if (videoComments.value === undefined) return;

    items.value = videoComments.value.data.comments
      .map((val) => ({
        id: val.id, // ID
        comment_id: val.comment_id, // 댓글 ID
        author_display_name: val.author_display_name, // 작성자명
        author_profile_image_url: val.author_profile_image_url, // 작성자이미지
        text_display: val.text_display, // 댓글 내용
        published_at: val.published_at, // 날짜
        like_count: val.like_count //  좋아요 수
      }))
      .reverse();
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};

watch(
  () => props.showModal,
  () => {
    if (props.showModal) {
      handleGetVideoIdDeletedComments();
    }
  }
);
</script>

<template>
  <Teleport to="body">
    <modal class-name="deleted-comments" :show-modal="showModal" @close="$emit('close')">
      <CloseModalBtn @on-click-btn="$emit('close')" />

      <div class="deleted-comments-header">삭제된 댓글</div>
      <div class="deleted-comments-table">
        <div class="t-head">
          <div>번호</div>
          <div>작성자</div>
          <div>댓글 내용</div>
          <div>날짜</div>
          <div>좋아요</div>
        </div>
        <ul class="t-body">
          <IsPending v-if="pendingVideoIdCommentsSync || pendingVideoComments" />
          <li v-for="(item, index) in items" v-else :key="item.id" class="row">
            <TextCell :text="(index + 1).toString()" />
            <WriterCell :name="item.author_display_name" />
            <TextCell :text="item.text_display" />
            <DateCell :date="item.published_at" />
            <LikesCell :count="item.like_count" />
          </li>
        </ul>
      </div>
      <BasePagination v-if="items.length > 0 && !pendingVideoIdCommentsSync && !pendingVideoComments" v-model:current-page="queryParams.page" :total="videoComments?.data.pagination.total_pages || 1" @on-select-page="onSelectPage" />

      <div class="btns">
        <TextBtn class="second" text="닫기" @click="$emit('close')" />
      </div>
    </modal>
  </Teleport>
</template>

<style lang="scss">
.deleted-comments {
  display: flex;
  flex-direction: column;

  padding: 20px 20px 40px 20px;

  @include mobile {
    max-width: 90%;
  }

  .deleted-comments-header {
    flex-shrink: 0;
    text-align: center;
    margin-bottom: 20px;

    @include fontStyle(14px, 600, $gray_2);
  }

  .deleted-comments-table {
    padding-left: 60px;
    padding-right: 60px;

    @include tablet {
      padding-left: 0;
      padding-right: 0;
    }

    @include mobile {
      overflow: scroll clip;
    }

    .t-head,
    .row {
      display: flex;

      & > div {
        min-width: 50px;
        align-content: center;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
    }

    .t-head {
      display: flex;
      height: 29px;
      margin-bottom: 6px;

      @include fontStyle(11px, 600, $gray_3);

      & > div {
        border-bottom: 1px solid $gray_e;
        text-align: center;

        &:nth-of-type(2) {
          min-width: 155px;
          max-width: 155px;
        }

        &:nth-of-type(3) {
          min-width: 207px;
          max-width: 207px;
        }

        &:nth-of-type(4),
        &:nth-of-type(5) {
          min-width: 67px;
          max-width: 67px;
        }
      }
    }

    .t-body {
      .row {
        display: flex;
        height: 32px;

        &:nth-of-type(even) {
          background-color: $gray_f9;
        }

        & > span {
          min-width: 155px;
          max-width: 155px;
        }

        & > div {
          min-width: 50px;
          align-content: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &:nth-of-type(2) {
            min-width: 207px;
            max-width: 207px;
          }

          &:nth-of-type(3),
          &:nth-of-type(4) {
            min-width: 67px;
            max-width: 67px;
          }
        }
      }
    }
  }

  .pagination {
    margin-top: 6px;

    ul {
      justify-content: center;
    }
  }

  .btns {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    height: 30px;
    margin-top: 20px;

    .text-btn {
      height: inherit;
    }
  }
}
</style>
