import { css } from '@emotion/css';
import clsx from 'clsx';
import { forwardRef } from 'react';

import { CustomStylingProps } from '@productCard/types';
import { PRICE_UNIT } from '@productCard/constants';
import { useProductCardBase } from '@productCard/ProductCardBase';
import COLOR from '@shared/constants/colorset';
import { addComma } from '@shared/services/formatter.service';

type Ref = HTMLParagraphElement;

const rootStyle = css`
  color: ${COLOR.kurlyGray450};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  text-decoration: line-through;
`;

const DiscountedPrice = forwardRef<Ref, CustomStylingProps>(({ style, className }, ref) => {
  const { product } = useProductCardBase();
  const { salesPrice, discountedPrice, discountRate } = product;

  if (!salesPrice || discountRate <= 0 || !discountedPrice) return null;

  return (
    <span ref={ref} className={clsx(rootStyle, className)} style={style}>{`${addComma(salesPrice)}${PRICE_UNIT}`}</span>
  );
});

DiscountedPrice.displayName = 'DiscountedPrice';

export { DiscountedPrice };
