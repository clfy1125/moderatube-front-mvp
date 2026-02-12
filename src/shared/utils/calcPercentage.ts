export const calcPercentage = (part?: number, whole?: number) => {
  if (typeof part !== 'number' || typeof whole !== 'number') return '-';

  const result = Math.round((part / whole) * 100);
  if (isNaN(result)) return '-';

  return Math.round((part / whole) * 100) + '%';
};
