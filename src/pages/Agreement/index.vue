<script setup lang="ts">
import Widget from './Widget/index.vue';

defineOptions({ name: 'AgreementPage' });
</script>

<!-- AT,RT도 있고 약관동의도 다 했다면 진입을 막아야 하는가??? -->

<template>
  <section id="agreement-page">
    <Widget />
  </section>
</template>

<style lang="scss" scoped>
#agreement-page {
  width: 100%;
  height: 100%;
}
</style>
