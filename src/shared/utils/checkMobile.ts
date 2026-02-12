export const checkMobile = () => {
  //userAgent 값 얻기
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes('android')) return 'android';
  else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) return 'ios';
};
