<!-- 댓글관리 위젯 -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useRoute } from 'vue-router';

import { usePostVideoIdCommentsSync } from '@/features/comment/api/postVideoIdCommentsSync';
import ClassifiedCommentsPanel from '@/features/comment/ClassifiedCommentsPanel/index.vue';
import DeletedCommentsModal from '@/features/comment/DeletedCommentsModal/index.vue';
import UnclassifiedCommentsPanel from '@/features/comment/UnclassifiedCommentsPanel/index.vue';
import ConfirmVideosAnalysisAndDelModal from '@/features/videos/modals/ConfirmVideosAnalysisAndDelModal/index.vue';
import ConfirmVideosAnalysisModal from '@/features/videos/modals/ConfirmVideosAnalysisModal/index.vue';
import ReserveDeletionModal from '@/features/videos/modals/ReserveDeletionModal/index.vue';
import ReserveDeletionBtn from '@/features/videos/ReserveDeletionBtn/index.vue';
import VideoStatsSummaryPanel from '@/features/videos/VideoStatsSummaryPanel/index.vue';
import GoBackBtn from '@/shared/components/btns/GoBackBtn/index.vue';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import PageFooter from '@/shared/components/Footer/index.vue';
import TabBtns from '@/shared/components/TabBtns/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';

import { ECommentTabEnum } from '../enum';

defineOptions({ name: 'CommentManagementWidget' });

const route = useRoute();
const alertStore = useAlertStore();

const { mutateAsync: postVideoIdCommentsSync, data: synced, isPending: pendingVideoIdCommentsSync } = usePostVideoIdCommentsSync(route.params.id as string);

const tab = ref<ECommentTabEnum>(ECommentTabEnum.UNCLASSIFIED);
const changeTab = (selectedTab: string) => (tab.value = selectedTab as ECommentTabEnum);

const autoDeletionAt = ref('');

const btnsAreVisibleOnMobile = ref<boolean>(false);

const showReserveDeletionModal = ref(false);
const showConfirmVideosAnalysisModal = ref(false);
const showConfirmVideosAnalysisAndDelModal = ref(false);
const showDeletedCommentsModal = ref<boolean>(false);

const onSuccessAnalysis = () => {
  showConfirmVideosAnalysisModal.value = false;
  handlePostVideoIdCommentsSync();
};

const handlePostVideoIdCommentsSync = async () => {
  try {
    await postVideoIdCommentsSync();
    if (synced.value === undefined) return;
  } catch (err) {
    alertStore.changeAlert({
      open: true,
      error_code: (err as Err).response.data.error_code,
      error: (err as Err).response.data.error
    });
  }
};

onMounted(handlePostVideoIdCommentsSync);
</script>

<template>
  <div class="comment-management-widget">
    <div class="division-for-mobile" :data-btns-are-visible="btnsAreVisibleOnMobile">
      <GoBackBtn text="목록으로" link="/channel-management" />

      <VideoStatsSummaryPanel @on-get-video-info="(reserveDelTime: string) => (autoDeletionAt = reserveDelTime)" />

      <TabBtns :list="Object.values(ECommentTabEnum)" :tab="tab" @on-select-tab="changeTab" />

      <div class="common-btns-part">
        <ReserveDeletionBtn :auto-deletion-at="autoDeletionAt" @open-reserve-deletion-modal="showReserveDeletionModal = true" />
        <TextBtn text="삭제된 댓글" class-name="second" @click="() => (showDeletedCommentsModal = true)" />
      </div>

      <UnclassifiedCommentsPanel
        v-if="tab === ECommentTabEnum.UNCLASSIFIED"
        :pending-video-id-comments-sync="pendingVideoIdCommentsSync"
        @need-show-btns="(state: boolean) => (btnsAreVisibleOnMobile = state)"
        @on-videos-analysis="() => (showConfirmVideosAnalysisModal = true)"
        @on-videos-analysis-delete="() => (showConfirmVideosAnalysisAndDelModal = true)"
      />
      <ClassifiedCommentsPanel
        v-else
        :pending-video-id-comments-sync="pendingVideoIdCommentsSync"
        @need-show-btns="(state: boolean) => (btnsAreVisibleOnMobile = state)"
        @on-videos-analysis="() => (showConfirmVideosAnalysisModal = true)"
        @on-videos-analysis-delete="() => (showConfirmVideosAnalysisAndDelModal = true)"
      />
      <PageFooter />
    </div>

    <ReserveDeletionModal
      :show-modal="showReserveDeletionModal"
      :auto-deletion-at="autoDeletionAt"
      @close="() => (showReserveDeletionModal = false)"
      @on-reserved="
        (newTime: string) => {
          showReserveDeletionModal = false;
          autoDeletionAt = newTime;
        }
      "
    />

    <ConfirmVideosAnalysisModal :show-modal="showConfirmVideosAnalysisModal" title="전체 스팸 검사" :video-ids="[$route.params.id as string]" @close="() => (showConfirmVideosAnalysisModal = false)" @on-success="onSuccessAnalysis" />
    <ConfirmVideosAnalysisAndDelModal
      :show-modal="showConfirmVideosAnalysisAndDelModal"
      title="전체 스팸 검사 후 삭제"
      :video-ids="[$route.params.id as string]"
      @close="() => (showConfirmVideosAnalysisAndDelModal = false)"
      @on-success="onSuccessAnalysis"
    />

    <DeletedCommentsModal :show-modal="showDeletedCommentsModal" @close="() => (showDeletedCommentsModal = false)" />
  </div>
</template>

<style lang="scss" scoped>
.comment-management-widget {
  padding: 30px 40px;
  max-width: 1210px;

  @include tablet {
    display: flex;
    flex-direction: column;
    height: inherit;
    padding: 0;
  }

  .division-for-mobile {
    @include tablet {
      height: 100%;
      padding-top: 20px;
      padding-bottom: 20px;
      padding-left: 4%;
      padding-right: 4%;
      overflow: hidden auto;

      &[data-btns-are-visible='true'] {
        height: calc(100% - 70px);
      }
    }

    .tabs-part {
      position: relative;
      top: 40px;

      @include tablet {
        top: 80px;
        width: 100%;
      }
    }

    .common-btns-part {
      display: flex;
      justify-content: end;
      gap: 13px;
      height: 40px;

      @include tablet {
        position: relative;
        top: -20px;
      }

      .text-btn {
        height: 30px;
        padding-top: 8px;
        padding-bottom: 8px;
      }
    }
  }
}
</style>
