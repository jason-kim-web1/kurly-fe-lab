import { css } from '@emotion/css';
import clsx from 'clsx';
import { forwardRef } from 'react';

import { CustomStylingProps } from '@productCard/types';
import { useProductCardBase } from '@productCard/ProductCardBase';
import COLOR from '@shared/constants/colorset';

type Ref = HTMLSpanElement;

const rootStyle = css`
  color: ${COLOR.pointText};
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.2px;
`;

const DiscountRate = forwardRef<Ref, CustomStylingProps>(({ className, style }, ref) => {
  const { product } = useProductCardBase();
  const { discountRate } = product;

  if (!discountRate || discountRate <= 0) return null;

  return (
    <span ref={ref} className={clsx(rootStyle, className)} style={style}>
      {`${discountRate}%`}
    </span>
  );
});

DiscountRate.displayName = 'DiscountRate';

export { DiscountRate };
