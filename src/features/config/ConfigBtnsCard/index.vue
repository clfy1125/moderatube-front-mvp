<script setup lang="ts">
defineOptions({ name: 'ConfigBtnsCard' });

const privacy_policy_link = 'https://scientific-twill-9a2.notion.site/30440168edee8085ac87f68240043dc9';
const terms_of_services_link = 'https://scientific-twill-9a2.notion.site/30440168edee80e98716fdfaa2c7a8d9';
</script>

<template>
  <div class="config-btns-card">
    <div class="link-btn">
      <a :href="privacy_policy_link" target="_blank" rel="noopener noreferrer">서비스 이용 약관</a>
    </div>
    <div class="link-btn">
      <a :href="terms_of_services_link" target="_blank" rel="noopener noreferrer">개인정보 처리 방침</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.config-btns-card {
  display: flex;
  gap: 40px;

  .link-btn {
    a {
      text-decoration: none;
      background-color: transparent;
      @include fontStyle(14px, 400, $gray_7);
    }
  }
}
</style>
