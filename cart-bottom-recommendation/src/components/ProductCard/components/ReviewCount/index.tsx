import { css } from '@emotion/css';
import clsx from 'clsx';
import { forwardRef } from 'react';

import { CustomStylingProps } from '../../types/common';
import { useProductCardBase } from '../ProductCardBase';
import COLOR from '../../constants/colorset';
import { Review } from '../../icons/Review';

type Ref = HTMLDivElement;

type ReviewCountImplProps = CustomStylingProps & {
  reviewCount: string;
};

const rootStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

const reviewCountTextStyle = css`
  color: ${COLOR.kurlyGray450};
`;

const ReviewCountImpl = forwardRef<Ref, ReviewCountImplProps>(({ reviewCount, className, style }, ref) => (
  <div ref={ref} className={clsx(rootStyle, className)} style={style}>
    <Review />
    <span className={reviewCountTextStyle}>{reviewCount}</span>
  </div>
));

const ReviewCount = forwardRef<Ref, CustomStylingProps>(({ className, style }, ref) => {
  const {
    product: { reviewCount },
  } = useProductCardBase();
  if (!reviewCount) {
    return null;
  }
  return <ReviewCountImpl ref={ref} className={className} style={style} reviewCount={reviewCount} />;
});

ReviewCountImpl.displayName = 'ReviewCountImpl';
ReviewCount.displayName = 'ReviewCount';

export { ReviewCount };
