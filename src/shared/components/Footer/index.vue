<script setup lang="ts">
defineOptions({ name: 'PageFooter' });
</script>

<template>
  <div class="footer">
    <div>
      <p>울산광역시 울주군 언양읍 유니스트길 50, 251동 1층 101호 유니스파크(울산과학기술원) 44919</p>
      <p>+827080987102</p>
      <p>팩스번호: 0504-182-8808</p>
    </div>
    <div class="second-part">
      <p>상호명: Moderatube　대표자: 김시현</p>
      <p>사업자등록번호: 582-86-03901</p>
      <p>© Moderatube. All rights reserved.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;

  @include fontStyle(12px, 400, $gray_a, 16px);

  @include tablet {
    display: block;
  }

  .second-part {
    p {
      text-align: right;

      @include tablet {
        text-align: left;
      }
    }
  }
}
</style>
