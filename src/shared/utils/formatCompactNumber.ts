export const formatCompactNumber = (num?: number): string => {
  if (typeof num !== 'number') return '-';

  const formatter = Intl.NumberFormat('en', { notation: 'compact' });

  return formatter.format(num);
};
