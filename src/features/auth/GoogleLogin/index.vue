<script setup lang="ts">
import SignInWithGoogleBtn from '@/features/auth/SignInWithGoogleBtn/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';

import { useGetGoogleOAuthURL } from '../api/getGoogleOAuthURL';

defineOptions({ name: 'GoogleLogin' });

const alertStore = useAlertStore();

const { refetch: getGoogleOAuthURL, data: googleOAuthUrlData } = useGetGoogleOAuthURL({ redirect_url: `${import.meta.env.MODE === 'development' ? import.meta.env.VITE_LOCAL : import.meta.env.VITE_DEPLOY}/auth/login` }); // 구글 OAuth 인증 URL

const openGoogleLogin = async () => {
  try {
    const result = await getGoogleOAuthURL(); // auth_url 가져오기
    console.log('API Result:', result);
    
    if (!result || !result.data) {
      console.error('No data received from API');
      alertStore.changeAlert({ 
        open: true, 
        error: 'Google OAuth URL을 가져오는데 실패했습니다.', 
        error_code: 'NO_DATA' 
      });
      return;
    }

    const authUrl = result.data.data.auth_url;
    window.location.assign(authUrl);
  } catch (err) {
    console.error('Google OAuth Error:', err);
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};
</script>

<template>
  <SignInWithGoogleBtn @click="openGoogleLogin" />
</template>
