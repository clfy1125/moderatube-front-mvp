/** 숫자 이외 금지 */
// export const onlyNumberRegex = /[\\`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]/a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣 ]/gim;
export const onlyNumberRegex = /[^\d]/g; // 숫자만 허용

/** 전화번호 형식 */
export const phoneNumberRegex = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/;
