import { css } from '@emotion/css';
import clsx from 'clsx';
import { forwardRef } from 'react';

import { CustomStylingProps } from '@productCard/types';
import { useProductCardBase } from '@productCard/ProductCardBase';
import COLOR from '@shared/constants/colorset';
import { addComma } from '@shared/services/formatter.service';
import { PRICE_UNIT } from '@productCard/constants';

type Ref = HTMLSpanElement;

const rootStyle = css`
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: -0.5px;
`;

const SalesPrice = forwardRef<Ref, CustomStylingProps>(({ className, style }, ref) => {
  const { product } = useProductCardBase();
  const { discountedPrice, salesPrice, isMultiplePrice } = product;

  if (!salesPrice) return null;

  return (
    <span ref={ref} className={clsx(rootStyle, className)} style={style}>
      {`${addComma(discountedPrice || salesPrice)}${PRICE_UNIT}${isMultiplePrice ? '~' : ''}`}
    </span>
  );
});

SalesPrice.displayName = 'SalesPrice';

export { SalesPrice };
