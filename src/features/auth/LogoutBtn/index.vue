<script setup lang="ts">
import { useRouter } from 'vue-router';

import { getTokens, removeTokens } from '@/shared/api/token';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';

import { usePostLogout } from '../api/postLogout';

defineOptions({ name: 'LogoutBtn' });

const router = useRouter();
const alertStore = useAlertStore();

const { mutateAsync: postLogoutAsync, data } = usePostLogout();

const onClickLogout = async () => {
  const localTokens = getTokens();
  if (!localTokens) return;

  const { refreshToken } = JSON.parse(localTokens);
  if (!refreshToken) return;

  try {
    await postLogoutAsync({ refresh: refreshToken });
    if (data.value === undefined || !data.value.success) return alertStore.changeAlert({ open: true, error_code: data.value?.error_code || 'LOGOUT_FAILED', error: data.value?.error ?? '로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.' });

    removeTokens();
    /* 로그인으로 보내기 */
    router.replace('/auth/signin');
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};
</script>

<template>
  <button class="logout-btn" @click="onClickLogout">로그아웃</button>
</template>

<style lang="scss" scoped>
.logout-btn {
  background-color: transparent;
  margin-bottom: 50px;

  @include fontStyle(14px, 400, $gray_3);
}
</style>
