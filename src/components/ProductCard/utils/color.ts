import { chain } from 'lodash';

export const hexToRgba = (hexCode: string, alpha = 1) => {
  try {
    const [r, g, b] = hexCode.match(/\w\w/g)
      .map((hex) => parseInt(hex, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  } catch (error: any) {
    return `rgba()`;
  }
};
