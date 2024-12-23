import { css } from '@emotion/css';
import clsx from 'clsx';
import { forwardRef } from 'react';

import { CustomStylingProps } from '../../types/common';
import { PRICE_UNIT } from '../../constants/common';
import { useProductCardBase } from '../ProductCardBase';
import COLOR from '../../constants/colorset';
import { addComma } from '../../utils/formatter.service';

type Ref = HTMLParagraphElement;

type DiscountedPriceImplProps = CustomStylingProps & {
  price: number;
};

const rootStyle = css`
  color: ${COLOR.kurlyGray450};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  text-decoration: line-through;
`;

const DiscountedPriceImpl = forwardRef<Ref, DiscountedPriceImplProps>(({ price, className, style }, ref) => (
  <span ref={ref} className={clsx(rootStyle, className)} style={style}>{`${addComma(price)}${PRICE_UNIT}`}</span>
));

const DiscountedPrice = ({ style, className }: CustomStylingProps) => {
  const {
    product: { salesPrice, discountedPrice, discountRate },
  } = useProductCardBase();
  if (!salesPrice || discountRate <= 0 || !discountedPrice) {
    return null;
  }
  return <DiscountedPriceImpl className={className} price={salesPrice} style={style} />;
};

DiscountedPriceImpl.displayName = 'DiscountedPriceImpl';
DiscountedPrice.displayName = 'DiscountedPrice';

export { DiscountedPrice };
