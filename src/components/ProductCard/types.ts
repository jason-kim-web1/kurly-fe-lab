import type { CSSProperties } from 'react';

export type CustomStylingProps = {
  style?: CSSProperties | undefined;
  className?: string | undefined;
};

export type ShortCutType = 'cart' | 'purchase' | 'detail' | 'restock_notification';
