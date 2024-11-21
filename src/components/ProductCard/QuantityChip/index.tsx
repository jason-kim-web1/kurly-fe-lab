import { css } from '@emotion/css';
import clsx from 'clsx';
import { forwardRef } from 'react';

import { CustomStylingProps } from '@productCard/types';
import { useProductCardBase } from '@productCard/ProductCardBase';
import COLOR from '@shared/constants/colorset';
import { addComma } from '@shared/services/formatter.service';

type Ref = HTMLHeadingElement;

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

const QuantityChip = forwardRef<Ref, CustomStylingProps>(({ className, style }, ref) => {
  const { product } = useProductCardBase();
  const { quantity } = product;

  if (!quantity) return null;
  return (
    <span ref={ref} className={clsx(rootStyle, className)} style={style}>
      {`${addComma(quantity)}개 남음`}
    </span>
  );
});

QuantityChip.displayName = 'QuantityChip';

export { QuantityChip };
