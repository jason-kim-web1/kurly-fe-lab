import { css } from '@emotion/css';
import clsx from 'clsx';
import { forwardRef } from 'react';

import { CustomStylingProps } from '@shared/type';
import { useProductCardBase } from '@productCard/ProductCardBase';
import COLOR from '@shared/constants/colorset';

type Ref = HTMLSpanElement;

type DiscountRateImplProps = CustomStylingProps & {
  rate: number;
};

const rootStyle = css`
  color: ${COLOR.pointText};
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.2px;
`;

const DiscountRateImpl = forwardRef<Ref, DiscountRateImplProps>(({ rate, className, style }, ref) => (
  <span ref={ref} className={clsx(rootStyle, className)} style={style}>{`${rate}%`}</span>
));

const DiscountRate = forwardRef<Ref, CustomStylingProps>(({ className, style }, ref) => {
  const {
    product: { discountRate },
  } = useProductCardBase();
  if (!discountRate || discountRate <= 0) {
    return null;
  }
  return <DiscountRateImpl ref={ref} className={className} style={style} rate={discountRate} />;
});

DiscountRateImpl.displayName = 'DiscountRateImpl';
DiscountRate.displayName = 'DiscountRate';

export { DiscountRate };
