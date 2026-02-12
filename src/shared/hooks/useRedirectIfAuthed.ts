import { onMounted } from 'vue';

import { useRouter } from 'vue-router';

import { getTokens } from '@/shared/api/token';

export const useRedirectIfAuthed = () => {
  const router = useRouter();

  onMounted(() => {
    const localTokens = getTokens();
    if (!localTokens) return;

    const { accessToken, refreshToken } = JSON.parse(localTokens);
    if (accessToken || refreshToken) router.replace({ name: 'Home' });
  });
};
