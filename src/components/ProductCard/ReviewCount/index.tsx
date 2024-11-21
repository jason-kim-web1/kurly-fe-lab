import { css } from '@emotion/css';
import clsx from 'clsx';
import { forwardRef } from 'react';

import { CustomStylingProps } from '@productCard/types';
import { useProductCardBase } from '@productCard/ProductCardBase';
import COLOR from '@shared/constants/colorset';
import { Review } from '@shared/components/icons/Review';

type Ref = HTMLDivElement;

const rootStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

const reviewCountTextStyle = css`
  color: ${COLOR.kurlyGray450};
`;

const ReviewCount = forwardRef<Ref, CustomStylingProps>(({ className, style }, ref) => {
  const { product } = useProductCardBase();
  const { reviewCount } = product;

  if (!reviewCount) return null;

  return (
    <div ref={ref} className={clsx(rootStyle, className)} style={style}>
      <Review />
      <span className={reviewCountTextStyle}>{reviewCount}</span>
    </div>
  );
});

ReviewCount.displayName = 'ReviewCount';

export { ReviewCount };
