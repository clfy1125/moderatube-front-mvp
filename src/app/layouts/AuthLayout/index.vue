<script setup>
defineOptions({ name: 'AuthLayout' });
</script>

<template>
  <div class="auth-layout">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  width: 100%;
  height: 100%;
}
</style>
