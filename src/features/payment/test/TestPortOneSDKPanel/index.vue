<script setup lang="ts">
defineOptions({ name: 'TestPortOne' });

import * as PortOne from '@portone/browser-sdk/v2';
import {
  BillingKeyAndPayMethod,
  Currency,
  IssueBillingKeyAndPayRequest,
  IssueBillingKeyAndPayResponse,
  IssueBillingKeyRequest,
  IssueBillingKeyResponse,
  PaymentCurrency,
  PaymentPayMethod,
  PaymentRequest,
  PaymentResponse
} from '@portone/browser-sdk/v2';

/*
 * 포트원 KG이니시스 연동 문서 https://developers.portone.io/opi/ko/integration/pg/v2/inicis-v2?v=v2#sdk-%EA%B2%B0%EC%A0%9C-%EC%9A%94%EC%B2%AD%ED%95%98%EA%B8%B0
 * 포트원(PortOne)에서 말하는 빌링키는 "구독형 정기결제, 종량제 과금결제 등에 사용되는 결제용 암호화 키"를 말함
 * PortOne.requestPayment ▶ 단건 결제 (사용자 인터렉션 → 결제창)
 * PortOne.requestIssueBillingKey ▶ 빌링키만 발급 (카드/휴대폰을 등록해서 토큰화된 결제수단 얻어서 진행)
 * PortOne.requestIssueBillingKeyAndPay ▶ 빌링키 발급 + 첫 결제도 동시에 처리
 */

const storeId = import.meta.env.VITE_STORE_ID;
const channelKey = import.meta.env.VITE_CHANNEL_KEY; // [선택사항] 채널 키와 채널 그룹 ID 중 하나를 지정

/** 결제 요청 */
const handleRequestPayment = async (params: PaymentRequest) => {
  try {
    const result: PaymentResponse | undefined = await PortOne.requestPayment(params);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

/** 빌링키 발급 요청 */
const handleRequestIssueBillingKey = async (params: IssueBillingKeyRequest) => {
  try {
    const result: IssueBillingKeyResponse | undefined = await PortOne.requestIssueBillingKey(params);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

/** 빌링키 발급 및 결제 요청  */
const handleRequestIssueBillingKeyAndPay = async (params: IssueBillingKeyAndPayRequest) => {
  try {
    const result: IssueBillingKeyAndPayResponse = await PortOne.requestIssueBillingKeyAndPay(params);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <div class="test-portone">
    <button
      @click="
        () => {
          const params = {
            storeId: storeId,
            channelKey: channelKey, // [선택사항] 채널 키와 채널 그룹 ID 중 하나를 지정
            paymentId: `payment-${new Date().getTime()}`, // 백에서 orderSession 열어주시기로 시간으로 넣으면 안되나? 길이 40중요함.. 이걸로 조회하고 결제취소하기 때문
            orderName: `{credit} 크레딧`,
            totalAmount: 1000, // price
            currency: PaymentCurrency.KRW,
            payMethod: PaymentPayMethod.CARD,
            customer: {
              fullName: '이길수',
              email: 'gilsunineright@gmail.com',
              phoneNumber: '010-3845-6275'
            }
            // products: [
            //   { id: 1, name: 'test', code: 'A123', quantity: 1, amount: 1000 }
            // ]
            // windowType: PortOne.WindowType.IFRAME
          };

          handleRequestPayment(params);
        }
      "
    >
      결제요청
    </button>

    <div class="payment card">
      <p>카드결제 ▼</p>
      <button
        @clidk="
          () => {
            const params = {
              storeId: storeId,
              channelKey: channelKey, // [선택사항] 채널 키와 채널 그룹 ID 중 하나를 지정
              billingKeyMethod: PaymentPayMethod.CARD,
              customer: {
                fullName: '포트원', // 필수
                phoneNumber: '010-0000-1234', // 필수
                email: 'test@portone.io' // 필수
              }
              /* 
                method: {
                card: {
                  credential: {
                    number: '{숫자15~16자리}',
                    expiryYear: '{연도2자리}',
                    expiryMonth: '{월2자리}',
                    birthOrBusinessRegistrationNumber: '{생년월일6자리}',
                    passwordTwoDigits: '{비밀번호앞2자리}'
                  }
                }
              }
              */
            };

            handleRequestIssueBillingKey(params);
          }
        "
      >
        카드 빌링키 발급
      </button>
    </div>

    <div class="payment mobile">
      <div>휴대폰 ▼</div>
      <button
        @clidk="
          () => {
            /*
             * KG이니시스 휴대폰 결제의 경우 정책상 빌링키 발급과 초회 결제가 함께 일어나야 하므로 이용하는 함수
             * https://developers.portone.io/sdk/ko/v2-sdk/billing-key-request?v=v2
             */
            const params = {
              storeId: storeId,
              channelKey: channelKey,
              billingKeyAndPayMethod: BillingKeyAndPayMethod.MOBILE,
              totalAmount: 1000,
              currency: Currency.KRW,
              paymentId: 'test-paymentId',
              orderName: 'test-orderName',
              /*
               * offPeriod 파라미터 유의사항
               * KG이니시스 모바일 빌링키 발급 및 결제의 경우 offPeriod가 필수
               * range 방식으로 입력할 경우 from과 to 모두를 입력해야한다. from은 to보다 과거 시간이어야 한다.
               * interval 방식으로 입력할 경우는 1m 또는 1y만 허용. 1m를 입력할 경우 월 정기결제, 1y를 입력할 경우 연 정기결제 로 빌링키 발급 창에 노출
               */
              offerPeriod: { interval: '1m' },
              customer: {
                fullName: '포트원', // 필수
                phoneNumber: '010-0000-1234', // 필수
                email: 'test@portone.io' // 필수
              }
            };

            handleRequestIssueBillingKeyAndPay(params);
          }
        "
      >
        휴대폰 빌링키 발급 & 결제
      </button>
    </div>

    <!-- 
      * 간편결제 요청시에는 easyPay파라미터 작성 필요. 
      * [지원중인 간편결제사] 카카오페이, 애플페이, L.PAY, SSGPAY, 네이버페이, PAYCO, 삼성페이, Kbank, zero페이, toss페이, Tmoney페이
      * easyPay: { easyPayProvider: ... }에 작성할 타입은 EasyPayProvider 참고
    -->
    <div class="payment easy-pay">
      <div>간편결제 ▼</div>
      <button>카카오페이</button>
      <button>애플페이</button>
      <button>L.PAY</button>
      <button>SSGPAY</button>
      <button>네이버페이</button>
      <button>PAYCO</button>
      <button>삼성페이</button>
      <button>Kbank</button>
      <button>zero페이</button>
      <button>toss페이</button>
      <button>Tmoney페이</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.test-portone {
  .payment {
    padding: 30px;
    margin-bottom: 30px;
    border: 1px solid red;
  }

  button {
    margin-top: 10px;
    width: 200px;
    border: 1px solid blue;
  }
}
</style>
