<script setup lang="ts">
defineOptions({ name: 'MainLayout' });

import { onMounted, watch, provide } from 'vue';

import { useRouter } from 'vue-router';

import { useGetAuthMe } from '@/features/auth/api/getAuthme';
import { usePostChannelSync } from '@/features/videos/api/postChannelSync';
import { getTokens, removeTokens } from '@/shared/api/token';
import LayoutHeader from '@/shared/components/layouts/LayoutHeader/index.vue';
import SideBar from '@/shared/components/layouts/SideBar/index.vue';
import AlertModal from '@/shared/components/modals/AlertModal/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { useChannelIdStore } from '@/shared/store/useChannelIdStore';
import { Err } from '@/shared/types/Error';
import { hasAgreed } from '@/shared/utils/hasAgreed';

const router = useRouter();
const alertStore = useAlertStore();

const channelIdStore = useChannelIdStore();

const { refetch: getAuthMe, data: userInfo } = useGetAuthMe();
const { mutateAsync: postChannelSync, data: syncedChannel, isPending: pendingChannelSync } = usePostChannelSync();

const handleGetAuthMe = async () => {
  try {
    await getAuthMe();
    if (userInfo.value === undefined) {
      alertStore.changeAlert({
        open: true,
        error_code: 'FAILED_TO_RECEIVE_USER_INFO',
        error: '사용자 정보를 가져올 수 없습니다.'
      });

      /* 로그인으로 보내기 & 토큰도 제거 */
      removeTokens();
      router.replace('/');

      return;
    }

    const result = hasAgreed(userInfo.value.data.profile.agreement);
    if (!result) router.replace('/auth/agreement'); // 약관에 아직 미동의한 상태라면 약관동의로 이동
  } catch (err) {
    alertStore.changeAlert({
      open: true,
      error: (err as Err).response.data.error,
      error_code: (err as Err).response.data.error_code
    });
  }
};

const handlePostChannelSync = async () => {
  if (!channelIdStore.channelId) return; // channelId가 없다면 리턴

  try {
    await postChannelSync({ channelId: channelIdStore.channelId });
    if (!syncedChannel.value?.success) return;
  } catch (err) {
    alertStore.changeAlert({
      open: true,
      error_code: (err as Err).response.data.error_code,
      error: (err as Err).response.data.error
    });
  }
};

watch(() => channelIdStore.channelId, handlePostChannelSync);

onMounted(async () => {
  const localTokens = getTokens();
  // AT, RT가 없다면 접근불가. 로그인으로 보내기
  if (!localTokens) return router.replace('/');

  handleGetAuthMe();
});

// provide로 내려줌
provide('pendingChannelSync', pendingChannelSync);
provide('userInfo', userInfo);
</script>

<template>
  <div class="main-layout">
    <LayoutHeader />
    <div class="main-layout-body">
      <SideBar />
      <router-view />
    </div>
    <AlertModal :show-modal="alertStore.alert.open" :error="alertStore.alert.error" :error-code="alertStore.alert.error_code" @close="alertStore.initAlert" />
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .main-layout-body {
    display: flex;
    flex-grow: 1;
    height: 0;

    .sidebar {
      /* 테블릿 사이즈 이하라면 레이아웃에서의 사이드바 감추기 => <LayoutHeader /> 내부의 <OffCanvas/> 로 애니메이션 처리 */
      @include tablet {
        display: none;
      }
    }
  }
}
</style>
