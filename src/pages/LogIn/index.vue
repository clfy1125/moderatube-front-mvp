<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useRouter } from 'vue-router';

import { usePostGoogleOAuthCallback } from '@/features/auth/api/postGoogleOAuthCallback';
import { setTokens } from '@/shared/api/token';
import AlertModal from '@/shared/components/modals/AlertModal/index.vue';
import { Err } from '@/shared/types/Error';
import { hasAgreed } from '@/shared/utils/hasAgreed';

defineOptions({ name: 'LogIn' });

const router = useRouter();
const { mutateAsync: postOAuthCallback, data: callbackData } = usePostGoogleOAuthCallback();

const showAlertModal = ref<boolean>(false);
const errMsg = ref({ error_code: '', error: '' });

const closeAlertModal = async () => {
  showAlertModal.value = false;
  /* 로그인으로 보내기 */
  await router.replace('/auth/signin');
};

/** Google OAuth 인증 후 콜백 처리 */
const handleCallback = async (code: string) => {
  try {
    await postOAuthCallback({ code });
    if (callbackData.value === undefined) return;

    setTokens(callbackData.value?.data.access, callbackData.value?.data.refresh);

    const result = hasAgreed(callbackData.value.data.user.profile.agreement);
    if (result) router.replace('/app');
    else router.replace('/auth/agreement');
  } catch (err) {
    console.error('google OAuth callback error: ', err);

    errMsg.value.error = (err as Err).response.data.error ?? '';
    errMsg.value.error_code = (err as Err).response.data.error_code ?? '';
    showAlertModal.value = true;
  }
};

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (!code) {
    errMsg.value.error_code = 'GOOGLE LOGIN FAILED';
    errMsg.value.error = '로그인 시도중 에러가 발생했습니다. 다시 시도해주세요.';
    showAlertModal.value = true;

    return;
  }

  handleCallback(code);
});
</script>

<template>
  <section id="google-login-page">
    <AlertModal :show-modal="showAlertModal" :error="errMsg.error" :error-code="errMsg.error_code" @close="closeAlertModal" />
  </section>
</template>

<style lang="scss" scoped>
#google-login-page {
  width: 100%;
  height: 100%;
}
</style>
