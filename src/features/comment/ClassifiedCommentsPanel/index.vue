<!-- (댓글관리 페이지)의 분류 댓글 패널 -->
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';

import { useRoute } from 'vue-router';

import CommentCell from '@/features/comment/CommentCell/index.vue';
import DeleteAllSpamBtn from '@/features/comment/DeleteAllSpamBtn/index.vue';
import DeleteCommentBtn from '@/features/comment/DeleteCommentBtn/index.vue';
import SelectCommentOption from '@/features/comment/SelectCommentOption/index.vue';
import BasePagination from '@/shared/components/BasePagination/index.vue';
import CommentStateCell from '@/shared/components/cells/CommentStateCell/index.vue';
import DateCell from '@/shared/components/cells/DateCell/index.vue';
import LikesCell from '@/shared/components/cells/LikesCell/index.vue';
import TextCell from '@/shared/components/cells/TextCell/index.vue';
import WriterCell from '@/shared/components/cells/WriterCell/index.vue';
import SearchInput from '@/shared/components/inputs/SeachInput/index.vue';
import IOSScrollHint from '@/shared/components/IOSScrollHint/index.vue';
import IsPending from '@/shared/components/IsPending/index.vue';
import ReportAsNonSpamModal from '@/shared/components/modals/ReportAsNonSpamModal/index.vue';
import ReportAsSpamModal from '@/shared/components/modals/ReportAsSpamModal/index.vue';
import CommentsTable from '@/shared/components/tables/CommentsTable/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { useChannelIdStore } from '@/shared/store/useChannelIdStore';
import { Err } from '@/shared/types/Error';

import { useGetComments } from '../api/getComments';
import { ECommentOption } from '../SelectCommentOption/enum';
import { CommentItem } from '../types/CommentItem';

interface IClassifiedCommentsPanelProps {
  pendingVideoIdCommentsSync: boolean;
}

const props = defineProps<IClassifiedCommentsPanelProps>();
defineOptions({ name: 'ClassifiedCommentsPanel' });
const emit = defineEmits<{ (e: 'need-show-btns', state: boolean): void }>();

const channelIdStore = useChannelIdStore();

const route = useRoute();
const alertStore = useAlertStore();

const { mutateAsync: getVideoComments, data: reviewedVideoComments, isPending: pendingVideoComments } = useGetComments();

const queryParams = reactive({
  channel_id: channelIdStore.channelId,
  page: 1,
  page_size: 15,
  search: '',
  spam_reviewed: true,
  type: ECommentOption.new,
  video_id: route.params.id as string
});

export type ReportItem = { comment_id: string; author_display_name: string; text_display: string };

const items = ref<CommentItem[]>([]);
const tableScrollLeft = ref(0);

const reportAsSpamModal = ref<boolean>(false);
const reportAsNonSpamModal = ref<boolean>(false);

const reportData = ref<ReportItem>({ comment_id: '', author_display_name: '', text_display: '' });
const changeReportData = (data: ReportItem) => (reportData.value = data);

const onEnterInput = (newText: string) => {
  queryParams.search = newText;
  queryParams.page = 1;
  handleGetReviewedVideoComments();
};

const onSelectType = (newSort: ECommentOption) => {
  queryParams.type = newSort;
  handleGetReviewedVideoComments();
};

const onSelectPage = (newPage: number) => {
  queryParams.page = newPage;
  handleGetReviewedVideoComments();
};

const checkItemsLength = () => {
  if (items.value.length > 0) emit('need-show-btns', true);
  else emit('need-show-btns', false);
};

const openReportModal = (comment_id: string, author_display_name: string, text_display: string, type?: ECommentOption) => {
  changeReportData({ comment_id, author_display_name, text_display });

  switch (type) {
    // ㉠ 스팸처럼 보인다면 '미발견' (= false_negative)
    case ECommentOption.normal:
      return (reportAsSpamModal.value = true);
    // ㉡ 스팸이 아닌 것 같아 보인다면 '오발견' (= false_positive)
    case ECommentOption.spam:
      return (reportAsNonSpamModal.value = true);
    default:
      return;
  }
};

const closeReportSpamModal = () => {
  reportAsSpamModal.value = false;
  changeReportData({ comment_id: '', author_display_name: '', text_display: '' });
};

const closeReportNonSpamModal = () => {
  reportAsNonSpamModal.value = false;
  changeReportData({ comment_id: '', author_display_name: '', text_display: '' });
};

const handleGetReviewedVideoComments = async () => {
  try {
    await getVideoComments({
      ...queryParams,
      type: queryParams.type === ECommentOption.new ? undefined : queryParams.type
    });
    if (reviewedVideoComments.value === undefined) return;

    items.value = reviewedVideoComments.value.data.comments.map((val) => ({
      id: val.id,
      comment_id: val.comment_id,
      text_display: val.text_display,
      author_profile_image_url: val.author_profile_image_url,
      author_display_name: val.author_display_name,
      published_at: val.published_at,
      like_count: val.like_count,
      type: val.type,
      is_comment_thread: val.is_comment_thread,
      comment_thread_id: val.comment_thread_id
    }));

    checkItemsLength();
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};

onMounted(handleGetReviewedVideoComments);

watch(items.value, checkItemsLength);
watch(
  () => props.pendingVideoIdCommentsSync,
  (newVal) => !newVal && handleGetReviewedVideoComments()
);
</script>

<template>
  <div class="classified-comments-panel">
    <div class="upper-part">
      <SearchInput :value="queryParams.search" @on-enter="onEnterInput" />
      <SelectCommentOption :option="queryParams.type" :disabled="pendingVideoIdCommentsSync || pendingVideoComments" @on-select-option="onSelectType" />
    </div>

    <CommentsTable type="CLASSIFIED" @on-scroll-table="(scrollLeft) => (tableScrollLeft = scrollLeft)">
      <IsPending v-if="pendingVideoIdCommentsSync || pendingVideoComments" />

      <li v-for="(item, index) in items" v-else :key="index" class="row spam">
        <TextCell :text="((queryParams.page === 1 ? 0 : (queryParams.page - 1) * queryParams.page_size) + index + 1).toString()" />
        <WriterCell :name="item.author_display_name" :author-profile-image-url="item.author_profile_image_url" />
        <CommentCell :content="item.text_display.replaceAll('<br>', '\n')" :is-comment-thread="item.is_comment_thread" />
        <DateCell :date="item.published_at" />
        <LikesCell :count="item.like_count" />
        <CommentStateCell :state="item.type" />
        <div class="optional-btns">
          <DeleteCommentBtn :comment-id="item.comment_id" />
          <button class="report-btn" @click="() => openReportModal(item.comment_id, item.author_display_name, item.text_display, item.type)">오류신고</button>
        </div>
      </li>
    </CommentsTable>
    <IOSScrollHint :hidden="tableScrollLeft > 5" />

    <BasePagination v-if="items.length > 0" v-model:current-page="queryParams.page" :total="reviewedVideoComments?.data.pagination.total_pages || 1" @on-select-page="onSelectPage" />
  </div>

  <div v-if="items.length > 0" class="btn-part">
    <DeleteAllSpamBtn :comment-ids="items.filter((item) => item.type === ECommentOption.spam).map((item) => item.comment_id)" />
  </div>

  <ReportAsSpamModal :show-modal="reportAsSpamModal" :report-data="reportData" @close="closeReportSpamModal" />
  <ReportAsNonSpamModal :show-modal="reportAsNonSpamModal" :report-data="reportData" @close="closeReportNonSpamModal" />
</template>

<style lang="scss" scoped>
.classified-comments-panel {
  padding: 30px;
  border: 1px solid $gray_d;
  border-radius: 2px;

  @include tablet {
    position: relative;
    top: 40px;
    padding: 20px 0 30px 0;
    border: none;
  }

  .upper-part {
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;

    @include tablet {
      gap: 16px;
      margin-bottom: 11px;
    }
  }

  li {
    &.spam {
      .writer-name,
      .comment-cell span,
      .date-cell,
      .likes-cell {
        color: $red;
      }
    }
  }

  .optional-btns {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;

    .report-btn {
      height: 19px;
      padding: 3px 2px;
      border-radius: 10px;
      background-color: $gray_a;

      @include fontStyle(11px, 600, $white);
    }
  }

  .ios-scroll-hint {
    top: 61px;
    right: -1px;
    height: calc(100% - 121px);
  }

  .pagination {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 14px;

    @include tablet {
      justify-content: center;
    }
  }
}

.btn-part {
  position: relative;
  top: -46px;
  left: 32px;
  display: flex;
  gap: 10px;
  width: fit-content;
  height: 30px;

  @include tablet {
    position: fixed;
    top: unset;
    bottom: 0px;
    left: 0px;
    flex-shrink: 0;

    width: 100%;
    height: 70px;
    padding: 20px 28.5px;
    border-top: 1px solid $gray_d;
  }

  .text-btn {
    height: 30px;
  }
}
</style>
