<script setup lang="ts">
import GoogleLogin from '@/features/auth/GoogleLogin/index.vue';
import { useRedirectIfAuthed } from '@/shared/hooks/useRedirectIfAuthed';

defineOptions({ name: 'SignInPage' });

useRedirectIfAuthed();
</script>

<template>
  <section id="signin-page">
    <div class="signin-logo"></div>
    <GoogleLogin />
  </section>
</template>

<style lang="scss" scoped>
#signin-page {
  display: flex;
  gap: 70px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .signin-logo {
    width: 126px;
    height: 142px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('@/shared/assets/login-icon.png');
  }
}
</style>
