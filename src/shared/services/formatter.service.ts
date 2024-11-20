const formatter = new Intl.NumberFormat('ko-KR');

export const addComma = (value: number | string): string => formatter.format(Number(value));

export const prefixPlus = (value: number | string): string => (Number(value) > 0 ? '+' : '');

export const prefixMinus = (value: number | string): string => (Number(value) > 0 ? '-' : '');

export const appendHyphenToPhoneNumber = (value: string) => value.replace(/^(\d{3})(\d{3,4})(\d{4})$/, '$1-$2-$3');

export const removeHyphen = (value: string) => value.replace(/-/g, '');

export const convertToKoreanNumber = (value: number): string => {
  if (value > 10000) {
    return `${Math.floor(value / 10000)}만원`;
  }

  if (value > 1000) {
    return `${Math.floor(value / 1000)}천원`;
  }

  return `${addComma(value)}원`;
};

export const convertToAllKoreanNumber = (value: number): string => {
  return `${addComma(value)}원`;
};
