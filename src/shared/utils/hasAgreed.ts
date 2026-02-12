/** 약관에 동의한 계정인지 체크하기 */
export const hasAgreed = (agreement: { terms_of_usage: { agreed: boolean; agreed_at?: string }; privacy_policy: { agreed: boolean; agreed_at?: string } }) => {
  if (agreement.terms_of_usage.agreed && agreement.privacy_policy.agreed) return true;
  else return false;
};
