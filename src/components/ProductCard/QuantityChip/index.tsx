import { css } from '@emotion/css';
import clsx from 'clsx';
import { forwardRef } from 'react';

import { CustomStylingProps } from '@shared/type';
import { useProductCardBase } from '@productCard/ProductCardBase';
import COLOR from '@shared/constants/colorset';
import { addComma } from '@shared/services/formatter.service';

type Ref = HTMLHeadingElement;

type QuantityChipImplProps = CustomStylingProps & {
  quantity: number;
};

const rootStyle = css`
  padding: 4px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLOR.kurlyGray600};
  font-size: 10px;
  font-weight: 500;
  border-radius: 4px;
  background: rgba(102, 102, 102, 0.06);
`;

const QuantityChipImpl = forwardRef<Ref, QuantityChipImplProps>(({ quantity, className, style }, ref) => (
  <span ref={ref} className={clsx(rootStyle, className)} style={style}>
    {`${addComma(quantity)}개 남음`}
  </span>
));

const QuantityChip = forwardRef<Ref, CustomStylingProps>(({ className, style }, ref) => {
  const {
    product: { quantity },
  } = useProductCardBase();
  if (!quantity) {
    return null;
  }
  return <QuantityChipImpl ref={ref} quantity={quantity} className={className} style={style} />;
});

QuantityChipImpl.displayName = 'QuantityChipImpl';
QuantityChip.displayName = 'QuantityChip';

export { QuantityChip };
