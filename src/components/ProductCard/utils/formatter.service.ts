const formatter = new Intl.NumberFormat('ko-KR');

export const addComma = (value: number | string): string => formatter.format(Number(value));
