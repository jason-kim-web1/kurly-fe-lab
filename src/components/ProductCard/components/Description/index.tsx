import { css } from '@emotion/css';
import clsx from 'clsx';
import { forwardRef } from 'react';

import type { CustomStylingProps } from '../../types/common';
import { useProductCardBase } from '../ProductCardBase';
import COLOR from '../../constants/colorset';

type Ref = HTMLParagraphElement;

type DescriptionImplProps = CustomStylingProps & {
  name: string;
};

const rootStyle = css`
  color: ${COLOR.kurlyGray450};
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

const DescriptionImpl = forwardRef<Ref, DescriptionImplProps>(({ name, className, style }, ref) => (
  <p ref={ref} className={clsx(rootStyle, className)} style={style}>
    {name}
  </p>
));

const Description = forwardRef<Ref, CustomStylingProps>(({ style, className }, ref) => {
  const {
    product: { description },
  } = useProductCardBase();
  if (!description) {
    return null;
  }
  return <DescriptionImpl ref={ref} name={description} className={className} style={style} />;
});

DescriptionImpl.displayName = 'DescriptionImpl';
Description.displayName = 'Description';

export { Description };
