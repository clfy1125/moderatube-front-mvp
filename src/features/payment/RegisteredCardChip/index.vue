<script setup lang="ts">
defineOptions({ name: 'RegisteredCardChip' });

const onClickChangeCardBtn = () => {
  // 구독중인 게 있다면 취소부터 해야한다고 경고 alert 띄우기
};

// const { mutateAsync: postIssueBillingkey } = usePostIssueBillingKey();

// const storeId = import.meta.env.VITE_STORE_ID;
// const channelKey = import.meta.env.VITE_CHANNEL_KEY;

// const reqTestBillingKey = async () => {
//   const result = await postIssueBillingkey({
//     storeId: storeId,
//     channelKey: channelKey,
//     customer: {
//       // fullName: '포트원',
//       name: {
//         full: '이길수'
//       },
//       // firstName: '길수',
//       // lastName: '이',
//       email: 'gilsunineright@gmail.com',
//       phoneNumber: '010-1234-5678'
//     },
//     method: {
//       card: {
//         credential: {
//           number: '5155945013624224',
//           expiryYear: '29',
//           expiryMonth: '02',
//           birthOrBusinessRegistrationNumber: '930914',
//           passwordTwoDigits: '47'
//         }
//       }
//     }
//   });

//   console.log(result);
// };
</script>

<template>
  <div class="registered-card-chip">
    <p>삼성카드 9321</p>
    <button class="change-card-btn" @click="onClickChangeCardBtn">변경</button>
  </div>
</template>

<style lang="scss" scoped>
.registered-card-chip {
  display: flex;
  gap: 10px;
  align-items: center;
  width: fit-content;
  padding: 20px 30px;
  border: 2px solid $key_color;
  border-radius: 2px;

  p {
    @include fontStyle(16px, 600, $gray_3);
  }

  .change-card-btn {
    width: 60px;
    height: 30px;
    background-color: $gray_d;

    @include fontStyle(12px, 600, $gray_2);
  }
}
</style>
