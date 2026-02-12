<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useRouter } from 'vue-router';

import { usePostGoogleOAuthLink } from '@/features/auth/api/postGoogleOAuthLink';
import AlertModal from '@/shared/components/modals/AlertModal/index.vue';
import { Err } from '@/shared/types/Error';

defineOptions({ name: 'LinkPage' });

const router = useRouter();
const { mutateAsync: postGoogleOAuthLink, data: linkData } = usePostGoogleOAuthLink();

const showAlertModal = ref<boolean>(false);
const errMsg = ref({ error_code: '', error: '' });

const closeAlertModal = async () => {
  showAlertModal.value = false;

  await router.replace('/');
};

/** 기존 사용자 계정에 Youtube 계정 연결 시도 */
const handleLink = async (code: string) => {
  try {
    await postGoogleOAuthLink({ code });
    if (linkData.value === undefined) return;
    router.replace('/');
  } catch (err) {
    console.error('google OAuth link error: ', err);

    errMsg.value.error = (err as Err).response.data.error ?? '';
    errMsg.value.error_code = (err as Err).response.data.error_code ?? '';
    showAlertModal.value = true;
  }
};

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (!code) {
    errMsg.value.error_code = 'YOUTUBE ACCOUNT CONNECTION FAILED';
    errMsg.value.error = '계정 연결시도중 에러가 발생했습니다. 다시 시도해주세요.';
    showAlertModal.value = true;

    return;
  }

  handleLink(code);
});
</script>

<template>
  <section id="google-link-page">
    <AlertModal :show-modal="showAlertModal" :error="errMsg.error" :error-code="errMsg.error_code" @close="closeAlertModal" />
  </section>
</template>

<style lang="scss" scoped>
#google-link-page {
  width: 100%;
  height: 100%;
}
</style>
