<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import { useRouter } from 'vue-router';

import { useGetAuthMe } from '@/features/auth/api/getAuthme';
import { usePutProfileUpdate } from '@/features/auth/api/putProfileUpdate';
import { getTokens } from '@/shared/api/token';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import Checkbox from '@/shared/components/inputs/CheckBox/index.vue';
import AlertModal from '@/shared/components/modals/AlertModal/index.vue';
import { Err } from '@/shared/types/Error';
import { hasAgreed } from '@/shared/utils/hasAgreed';

defineOptions({ name: 'AgreementWidget' });

const router = useRouter();

const { refetch: getAuthMe, data: userInfo } = useGetAuthMe();
const { mutateAsync: putProfileUpdate, data: profileUpdateResult } = usePutProfileUpdate();

const showAlertModal = ref<boolean>(false);
const errMsg = ref({ error_code: '', error: '' });

const privacy_policy_link = ref('https://scientific-twill-9a2.notion.site/30440168edee8085ac87f68240043dc9');
const terms_of_services_link = ref('https://scientific-twill-9a2.notion.site/30440168edee80e98716fdfaa2c7a8d9');

const state = reactive({ termsOfServices: false, privacyPolicy: false });

const handleGetAuthMe = async () => {
  try {
    await getAuthMe();
    if (userInfo.value === undefined) return;

    state.privacyPolicy = userInfo.value.data.profile.agreement.privacy_policy.agreed;
    state.termsOfServices = userInfo.value.data.profile.agreement.terms_of_usage.agreed;
  } catch (err) {
    errMsg.value.error = (err as Err).response.data.error ?? '';
    errMsg.value.error_code = (err as Err).response.data.error_code ?? '';
    showAlertModal.value = true;
  }
};



const handlePutProfileUpdate = async () => {
  try {
    await putProfileUpdate({ terms_of_usage_agreed: state.termsOfServices, privacy_policy_agreed: state.privacyPolicy });
    if (profileUpdateResult.value === undefined) return;

    const result = hasAgreed(profileUpdateResult.value.data.agreement);
    if (result) router.replace('/');
  } catch (err) {
    errMsg.value.error = (err as Err).response.data.error ?? '';
    errMsg.value.error_code = (err as Err).response.data.error_code ?? '';
    showAlertModal.value = true;
  }
};

onMounted(() => {
  const localTokens = getTokens();
  /* 로그인으로 보내기 */
  if (!localTokens) return router.replace('/auth/signin');

  handleGetAuthMe();
});
</script>

<template>
  <div class="agreement-widget">
    <div class="content">
      <div class="title">약관 동의</div>

      <div class="consent-column">
        <div class="consent-row">
          <Checkbox id="terms-of-usage" v-model="state.termsOfServices" />
          <a :href="terms_of_services_link" target="_blank" rel="noopener noreferrer">
            서비스 이용 약관
            <div class="link-icon"></div>
          </a>
        </div>
        <div class="consent-row">
          <Checkbox id="privacy-policy" v-model="state.privacyPolicy" />
          <a :href="privacy_policy_link" target="_blank" rel="noopener noreferrer">
            개인정보 처리 방침
            <div class="link-icon"></div>
          </a>
        </div>
      </div>

      <div class="btns-part">
        <TextBtn text="확인" :disabled="!state.privacyPolicy || !state.termsOfServices" @click="handlePutProfileUpdate" />
      </div>
    </div>
  </div>
  <AlertModal :show-modal="showAlertModal" :error="errMsg.error" :error-code="errMsg.error_code" @close="showAlertModal = false" />
</template>

<style lang="scss" scoped>
.agreement-widget {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    .title {
      text-align: center;
      margin-bottom: 40px;

      @include fontStyle(14px, 600, $gray_2);
    }

    .consent-column {
      width: 180px;
      display: flex;
      flex-direction: column;
      gap: 20px;

      .consent-row {
        display: flex;
        gap: 10px;
        align-items: center;

        a {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: transparent;
          text-decoration: none;

          @include fontStyle(14px, 400, $gray_2);

          .link-icon {
            flex-shrink: 0;
            width: 14px;
            height: 14px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            background-image: url('@/shared/assets/left-arrow-icon.svg');
            transform: rotateY(180deg);
            opacity: 0.4;
          }
        }
      }
    }

    .btns-part {
      display: flex;
      justify-content: center;
      margin-top: 50px;

      .text-btn {
        height: 30px;
      }
    }
  }
}
</style>
