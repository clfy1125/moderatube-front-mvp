<!-- (댓글관리 페이지)의 미분류 댓글 패널 -->
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';

import { useRoute } from 'vue-router';

import CommentCell from '@/features/comment/CommentCell/index.vue';
import DeleteCommentBtn from '@/features/comment/DeleteCommentBtn/index.vue';
import BasePagination from '@/shared/components/BasePagination/index.vue';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import CommentStateCell from '@/shared/components/cells/CommentStateCell/index.vue';
import DateCell from '@/shared/components/cells/DateCell/index.vue';
import LikesCell from '@/shared/components/cells/LikesCell/index.vue';
import TextCell from '@/shared/components/cells/TextCell/index.vue';
import WriterCell from '@/shared/components/cells/WriterCell/index.vue';
import SearchInput from '@/shared/components/inputs/SeachInput/index.vue';
import IOSScrollHint from '@/shared/components/IOSScrollHint/index.vue';
import IsPending from '@/shared/components/IsPending/index.vue';
import CommentsTable from '@/shared/components/tables/CommentsTable/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { useChannelIdStore } from '@/shared/store/useChannelIdStore';
import { Err } from '@/shared/types/Error';

import { useGetComments } from '../api/getComments';
import { ECommentOption } from '../SelectCommentOption/enum';
import { CommentItem } from '../types/CommentItem';
import { CommentsPanelEmits } from '../types/CommentsPanelEmits';

interface IUnclassifiedCommentsPanelProps {
  pendingVideoIdCommentsSync: boolean;
}

const props = defineProps<IUnclassifiedCommentsPanelProps>();
defineOptions({ name: 'UnclassifiedCommentsPanel' });
const emit = defineEmits<CommentsPanelEmits>();

const channelIdStore = useChannelIdStore();

const route = useRoute();
const alertStore = useAlertStore();

const { mutateAsync: getVideoComments, data: videoComments, isPending: pendingVideoComments } = useGetComments();

const queryParams = reactive({
  channel_id: channelIdStore.channelId,
  page: 1,
  page_size: 15,
  search: '',
  spam_reviewed: false,
  type: ECommentOption.new,
  video_id: route.params.id as string
});

const items = ref<CommentItem[]>([]);
const tableScrollLeft = ref(0);

const onEnterInput = (newText: string) => {
  queryParams.search = newText;
  queryParams.page = 1;
  handleGetVideoIdComments();
};

const onSelectPage = (newPage: number) => {
  queryParams.page = newPage;
  handleGetVideoIdComments();
};

const checkItemsLength = () => {
  if (items.value.length > 0) emit('need-show-btns', true);
  else emit('need-show-btns', false);
};

const handleGetVideoIdComments = async () => {
  try {
    await getVideoComments(queryParams);
    if (videoComments.value === undefined) return;

    items.value = videoComments.value.data.comments.map((val) => ({
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
    alertStore.changeAlert({
      open: true,
      error_code: (err as Err).response.data.error_code,
      error: (err as Err).response.data.error
    });
  }
};

onMounted(handleGetVideoIdComments);

watch(items.value, checkItemsLength);
watch(
  () => props.pendingVideoIdCommentsSync,
  (newVal) => !newVal && handleGetVideoIdComments()
);
</script>

<template>
  <div class="unclassified-comments-panel">
    <div class="upper-part">
      <SearchInput :value="queryParams.search" @on-enter="onEnterInput" />
    </div>

    <CommentsTable type="UNCLASSIFIED" @on-scroll-table="(scrollLeft) => (tableScrollLeft = scrollLeft)">
      <IsPending v-if="pendingVideoIdCommentsSync || pendingVideoComments" />

      <li v-for="(item, index) in items" v-else :key="index" class="row">
        <TextCell :text="((queryParams.page === 1 ? 0 : (queryParams.page - 1) * queryParams.page_size) + index + 1).toString()" />
        <WriterCell :name="item.author_display_name" :author-profile-image-url="item.author_profile_image_url" />
        <!-- MARK: 상위 쓰레드가 이 페이지에도 있는가? 있다면 리플라이 아이콘 표시O, 없다면 표시X 로 수정? -->
        <CommentCell :content="item.text_display.replaceAll('<br>', '\n')" :is-comment-thread="item.is_comment_thread" />
        <DateCell :date="item.published_at" />
        <LikesCell :count="item.like_count" />
        <CommentStateCell :state="item.type" />
        <div style="flex: 1; display: flex; justify-content: center; align-items: center">
          <DeleteCommentBtn :comment-id="item.comment_id" />
        </div>
      </li>
    </CommentsTable>
    <IOSScrollHint :hidden="tableScrollLeft > 5" />

    <BasePagination v-if="items.length > 0 && !pendingVideoIdCommentsSync && !pendingVideoComments" v-model:current-page="queryParams.page" :total="videoComments?.data.pagination.total_pages || 1" @on-select-page="onSelectPage" />
  </div>

  <div v-if="items.length > 0" class="btns-part">
    <TextBtn text="전체 스팸 검사" @click="emit('on-videos-analysis')" />
    <TextBtn text="전체 스팸 검사 후 삭제" @click="emit('on-videos-analysis-delete')" />
  </div>
</template>

<style lang="scss" scoped>
.unclassified-comments-panel {
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

  .ios-scroll-hint {
    top: 0px;
    right: -1px;
    height: calc(100% - 60px);
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

.btns-part {
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
