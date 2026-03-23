<script setup lang="ts">
import GoogleLogin from '@/features/auth/GoogleLogin/index.vue';
import { useRedirectIfAuthed } from '@/shared/hooks/useRedirectIfAuthed';

defineOptions({ name: 'SignInPage' });

useRedirectIfAuthed();
</script>

<template>
  <section id="signin-page">
    <div class="signin-content">
      <div class="signin-logo"></div>
      <GoogleLogin />
    </div>
    <footer class="signin-footer">
      <a href="/terms-of-service" target="_blank">이용약관</a>
      <span class="divider">|</span>
      <a href="/privacy-policy" target="_blank">개인정보 처리방침</a>
    </footer>
  </section>
</template>

<style lang="scss" scoped>
#signin-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .signin-content {
    flex: 1;
    display: flex;
    gap: 70px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .signin-logo {
    width: 220px;
    height: 50px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url('@/shared/assets/moderatube-logo.png');
  }

  .signin-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding-bottom: 32px;

    a {
      text-decoration: none;
      color: #999;
      font-size: 12px;

      &:hover {
        color: #666;
      }
    }

    .divider {
      color: #ccc;
      font-size: 12px;
    }
  }
}
</style>
