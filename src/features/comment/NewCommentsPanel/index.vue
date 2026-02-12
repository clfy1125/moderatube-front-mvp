<!-- (대시보드 페이지)의 신규 댓글 -->
<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue';

import DashboardPanel from '@/shared/components/DashboardPanel/index.vue';
import IOSScrollHint from '@/shared/components/IOSScrollHint/index.vue';
import CommentsSummaryTable from '@/shared/components/tables/CommentsSummaryTable/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { useChannelIdStore } from '@/shared/store/useChannelIdStore';
import { Err } from '@/shared/types/Error';

import { useGetComments } from '../api/getComments';
import { ECommentOption } from '../SelectCommentOption/enum';
import { CommentSummaryItem } from '../types/CommentSummaryItem';

defineOptions({ name: 'NewCommentsPanel' });

const pendingChannelSync = inject('pendingChannelSync');

const channelIdStore = useChannelIdStore();
const alertStore = useAlertStore();

const { mutateAsync: getComments, data: comments } = useGetComments();

const items = ref<CommentSummaryItem[]>([]);
const tableScrollLeft = ref(0);

const handleGetComments = async () => {
  if (!channelIdStore.channelId) return;

  try {
    await getComments({
      channel_id: channelIdStore.channelId,
      page: 1,
      page_size: 5,
      type: ECommentOption.new
    });

    if (comments.value === undefined) return;

    items.value =
      comments.value === undefined
        ? []
        : comments.value.data.comments.map((val) => ({
            id: val.id,
            comment_id: val.comment_id,
            video_title: val.video.title,
            author_profile_image_url: val.author_profile_image_url,
            author_display_name: val.author_display_name,
            text_display: val.text_display,
            published_at: val.published_at,
            like_count: val.like_count,
            type: val.type,
            video_id: val.video.video_id
          }));
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};

onMounted(handleGetComments);

watch(() => channelIdStore.channelId, handleGetComments);
watch(
  () => pendingChannelSync,
  (newVal) => !newVal && handleGetComments
);
</script>

<template>
  <DashboardPanel title="신규 댓글" class="new-comments">
    <CommentsSummaryTable
      :items="items"
      @on-scroll-table="
        (scrollLeft: number) => {
          tableScrollLeft = scrollLeft;
        }
      "
    />
    <IOSScrollHint :hidden="tableScrollLeft > 5" />
  </DashboardPanel>
</template>

<style lang="scss" scoped>
.new-comments {
  position: relative;
  border-bottom: 1px solid $gray_d;

  .ios-scroll-hint {
    top: 0px;
    right: 20px;
  }
}
</style>
