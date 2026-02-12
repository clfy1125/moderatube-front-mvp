export const formatKorNumber = (num?: number) => {
  if (typeof num !== 'number') return '-';

  const formatter = Intl.NumberFormat('ko-KR');

  return formatter.format(num);
};
