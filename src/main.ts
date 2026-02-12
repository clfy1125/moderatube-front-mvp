/* eslint-disable import/order */
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import router from '@/app/router/index';
import Modal from '@/shared/components/modals/BaseModal/index.vue';
import { QueryClient, VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';
import './global.scss';
import './reset.scss';

const pinia = createPinia();

// 🔧 Query Client 생성 및 옵션 정의
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 창 포커스 시 자동 리패치 방지
      retry: 1, // 실패 시 재시도 횟수
      staleTime: 1000 * 60 * 5 // 5분 동안 stale 상태 아님
    }
  }
});

const vueQueryOptions: VueQueryPluginOptions = {
  queryClient
};

createApp(App).use(pinia).use(VueQueryPlugin, vueQueryOptions).use(router).component('Modal', Modal).mount('#app');
