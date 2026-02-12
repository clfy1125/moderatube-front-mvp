<!-- 채널관리 위젯 -->
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { inject } from 'vue';

import ConfirmAnalysisAndDelModal from '@/features/channel/modals/ConfirmAnalysisAndDelModal/index.vue';
import ConfirmAnalysisModal from '@/features/channel/modals/ConfirmAnalysisModal/index.vue';
import ExaminedSpamModal from '@/features/spam/ExaminedSpamModal/index.vue';
import { useGetVideos } from '@/features/videos/api/getVideos';
import ConfirmVideosAnalysisAndDelModal from '@/features/videos/modals/ConfirmVideosAnalysisAndDelModal/index.vue';
import ConfirmVideosAnalysisModal from '@/features/videos/modals/ConfirmVideosAnalysisModal/index.vue';
import { EVideoOption } from '@/features/videos/SelectVideoOption/enum';
import SelectVideoOption from '@/features/videos/SelectVideoOption/index.vue';
import { VideoItem } from '@/features/videos/types/VideItem';
import VideosTable from '@/features/videos/VideosTable/index.vue';
import BasePagination from '@/shared/components/BasePagination/index.vue';
import PageFooter from '@/shared/components/Footer/index.vue';
import SearchInput from '@/shared/components/inputs/SeachInput/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { useChannelIdStore } from '@/shared/store/useChannelIdStore';
import { useVideosQueryParamsStore } from '@/shared/store/useChannelQueryStore';
import { Err } from '@/shared/types/Error';

import ExaminationBtns from '../ExaminationBtns/index.vue';

defineOptions({ name: 'ChannelManagementWidget' });

const pendingChannelSync = inject('pendingChannelSync');

const alertStore = useAlertStore();
const channelIdStore = useChannelIdStore();
const queryParamsStore = useVideosQueryParamsStore();
const { changeText, changePage, changeSort } = queryParamsStore;

const { mutateAsync: getVideos, data: videosData, isPending: pendingGetVideos } = useGetVideos();

const items = ref<VideoItem[]>([]);
const checkedVideoIds = ref<string[]>([]);

const showConfirmChannelAnalysisModal = ref(false);
const showConfirmChannelAnalysisAndDeleteModal = ref(false);
const showConfirmVideosAnalysisModal = ref(false);
const showConfirmVideosAnalysisAndDelModal = ref(false);

const showExaminedSpamModal = ref(false);

const onEnterInput = (newText: string) => {
  changeText(newText);
  handleGetVideos();
};

const onSelectSort = (option: { sort: EVideoOption; is_bookmarked?: boolean }) => {
  changeSort(option);
  handleGetVideos();
};

const onSelectPage = (newPage: number) => {
  changePage(newPage);
  checkedVideoIds.value = [];
  handleGetVideos();
};

const handleGetVideos = async () => {
  if (!channelIdStore.channelId) return; // channelId가 없다면 리턴

  try {
    await getVideos({
      channel_id: channelIdStore.channelId,
      ...(queryParamsStore.is_bookmarked && { is_bookmarked: queryParamsStore.is_bookmarked }),
      page: queryParamsStore.page,
      page_size: queryParamsStore.page_size,
      search: queryParamsStore.search,
      sort: queryParamsStore.sort
    });

    if (videosData.value === undefined) return;

    items.value = videosData.value.data.videos.map((val) => ({
      id: val.id,
      video_id: val.video_id,
      is_bookmarked: val.is_bookmarked,
      thumbnail_url: val.thumbnail_url,
      title: val.title,
      published_at: val.published_at,
      view_count: val.view_count,
      spam_review_count: val.spam_review_count,
      comment_count: val.comment_count
    }));
  } catch (err) {
    alertStore.changeAlert({
      open: true,
      error_code: (err as Err).response.data.error_code,
      error: (err as Err).response.data.error
    });
  }
};

onMounted(handleGetVideos);

watch(() => channelIdStore.channelId, handleGetVideos);
watch(
  () => pendingChannelSync,
  (newVal) => !newVal && handleGetVideos
);
</script>

<template>
  <div class="channel-management-widget">
    <div class="division-for-mobile">
      <div class="upper-part">
        <SearchInput :value="queryParamsStore.search" :disabled="pendingGetVideos || (pendingChannelSync as boolean)" @on-enter="onEnterInput" />
        <SelectVideoOption :sort="queryParamsStore.sort" :disabled="pendingGetVideos || (pendingChannelSync as boolean)" @on-select-sort="onSelectSort" />
      </div>

      <VideosTable v-model:checked-ids="checkedVideoIds" :is-pending="pendingGetVideos || (pendingChannelSync as boolean)" :items="items" :offset="queryParamsStore.page == 1 ? 0 : (queryParamsStore.page - 1) * queryParamsStore.page_size" />
      <BasePagination v-if="items.length > 0 && (!pendingChannelSync as boolean) && !pendingGetVideos" v-model:current-page="queryParamsStore.page" :total="videosData?.data.pagination.total_pages || 1" @on-select-page="onSelectPage" />
      <PageFooter />
    </div>

    <ExaminationBtns
      v-if="(!pendingChannelSync as boolean) && !pendingGetVideos"
      :items-length="items.length"
      :checked-ids-length="checkedVideoIds.length"
      @on-channel-analysis="() => (showConfirmChannelAnalysisModal = true)"
      @on-channel-analysis-delete="() => (showConfirmChannelAnalysisAndDeleteModal = true)"
      @on-videos-analysis="() => (showConfirmVideosAnalysisModal = true)"
      @on-videos-analysis-delete="() => (showConfirmVideosAnalysisAndDelModal = true)"
    />
  </div>

  <!-- 채널 검사 모달들 -->
  <ConfirmAnalysisModal :show-modal="showConfirmChannelAnalysisModal" @close="() => (showConfirmChannelAnalysisModal = false)" />
  <ConfirmAnalysisAndDelModal :show-modal="showConfirmChannelAnalysisAndDeleteModal" @close="() => (showConfirmChannelAnalysisAndDeleteModal = false)" />

  <!-- 선택한 비디오 검사 모달들 -->
  <ConfirmVideosAnalysisModal :show-modal="showConfirmVideosAnalysisModal" title="선택 스팸 검사" :video-ids="checkedVideoIds" @close="() => (showConfirmVideosAnalysisModal = false)" @on-success="() => (showConfirmVideosAnalysisModal = false)" />
  <ConfirmVideosAnalysisAndDelModal
    :show-modal="showConfirmVideosAnalysisAndDelModal"
    title="선택 스팸 검사 후 삭제"
    :video-ids="checkedVideoIds"
    @close="() => (showConfirmVideosAnalysisAndDelModal = false)"
    @on-success="() => (showConfirmVideosAnalysisAndDelModal = false)"
  />

  <!-- 검사 결과가 도착하면 아래 모달 노출 필요 -->
  <ExaminedSpamModal :show-modal="showExaminedSpamModal" @close="() => (showExaminedSpamModal = false)" />
</template>

<style lang="scss" scoped>
.channel-management-widget {
  display: flex;
  flex-direction: column;
  max-width: 1230px;
  padding: 30px 40px;

  @include tablet {
    padding: 0;
    height: 100%;
    overflow: hidden;
  }

  .division-for-mobile {
    @include tablet {
      flex: 1;
      padding-top: 20px;
      padding-bottom: 20px;
      padding-left: 4%;
      padding-right: 4%;
      overflow-y: auto;
    }

    .upper-part {
      display: flex;
      justify-content: space-between;
      margin-bottom: 14px;

      @include tablet {
        gap: 16px;
      }
    }

    .pagination {
      display: flex;
      justify-content: end;
      align-items: center;
      margin-top: 21px;

      @include tablet {
        justify-content: start;
        margin-top: 11px;
        margin-bottom: 54px;
      }
    }
  }
}
</style>
