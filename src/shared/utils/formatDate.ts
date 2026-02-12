// 2025-09-05T06:44:15.989Z -> 25.09.05 | 2025.09.05 | 09.05
export const formatDate = (date: string, format: 'yy' | 'yyyy' | 'mmdd' = 'yy') => {
  const splitDate = date.split('T');
  const YMD = splitDate[0].toString();
  const dateData = new Date(YMD);

  const yearYY = dateData.getFullYear().toString().slice(-2);
  const yearYYYY = dateData.getFullYear().toString();
  const month = (dateData.getMonth() + 1).toString().padStart(2, '0');
  const day = dateData.getDate().toString().padStart(2, '0');

  if (format === 'yy') return `${yearYY}.${month}.${day}`;
  if (format === 'yyyy') return `${yearYYYY}.${month}.${day}`;
  if (format === 'mmdd') return `${month}.${day}`;

  return `${yearYY}.${month}.${day}`; // fallback
};
