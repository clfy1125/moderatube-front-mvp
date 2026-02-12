import { ref } from 'vue';

import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', () => {
  const alert = ref<{ open: boolean; error: string; error_code: string }>({ open: false, error: '', error_code: '' });

  const changeAlert = (alertState: { open: boolean; error: string; error_code: string }) => (alert.value = alertState);
  const initAlert = () => (alert.value = { open: false, error: '', error_code: '' });

  return {
    alert,
    changeAlert,
    initAlert
  };
});
