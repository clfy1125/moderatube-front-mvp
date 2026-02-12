/* 이메일 유효성 체크 */
const isValidEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const parts = email.split('@');

  /* 300자 초과 안하고, 이메일 정규식에 맞고, 골뱅이 앞뒤로 작성되어 있어야 하며, 앞부분은 최대 150자, 뒷부분은 최대 150자 에 모두 부합하면 true반환 */
  return email.length <= 200 && emailPattern.test(email) && parts.length === 2 && parts[0].length <= 150 && parts[1].length <= 150;
};

export default isValidEmail;
