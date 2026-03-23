<script setup lang="ts">
defineOptions({ name: 'ConfigBtnsCard' });

const privacy_policy_link = '/privacy-policy';
const terms_of_services_link = '/terms-of-service';
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
