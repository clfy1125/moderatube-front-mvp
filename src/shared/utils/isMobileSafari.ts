export const isMobileSafari = () => {
  const userAgent = navigator.userAgent;

  return /Safari/i.test(userAgent) && /Mobile/i.test(userAgent);
};
