import { css } from '@emotion/css';
import clsx from 'clsx';
import { forwardRef } from 'react';

import { CustomStylingProps } from '@productCard/types/common';
import { PRICE_UNIT } from '@productCard/constants/common';
import { useProductCardBase } from '../ProductCardBase';
import COLOR from '@productCard/constants/colorset';
import { addComma } from '@productCard/utils/formatter.service';

type Ref = HTMLSpanElement;

type SalesPriceImplProps = CustomStylingProps & {
  isMultiplePrice: boolean;
  price: number;
};

const rootStyle = css`
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: -0.5px;
`;

const SalesPriceImpl = forwardRef<Ref, SalesPriceImplProps>(({ isMultiplePrice, price, className, style }, ref) => (
  <span ref={ref} className={clsx(rootStyle, className)} style={style}>{`${addComma(price)}${PRICE_UNIT}${
    isMultiplePrice ? '~' : ''
  }`}</span>
));

const SalesPrice = forwardRef<Ref, CustomStylingProps>(({ className, style }, ref) => {
  const {
    product: { discountedPrice, salesPrice, isMultiplePrice },
  } = useProductCardBase();
  if (!salesPrice) {
    return null;
  }
  return (
    <SalesPriceImpl
      ref={ref}
      isMultiplePrice={isMultiplePrice}
      price={discountedPrice || salesPrice}
      className={className}
      style={style}
    />
  );
});

SalesPriceImpl.displayName = 'SalesPriceImpl';
SalesPrice.displayName = 'SalesPrice';

export { SalesPrice };
