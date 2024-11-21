import { css } from '@emotion/css';
import clsx from 'clsx';
import { forwardRef } from 'react';

import type { CustomStylingProps } from '@productCard/types';
import { useProductCardBase } from '@productCard/ProductCardBase';
import COLOR from '@shared/constants/colorset';

type Ref = HTMLParagraphElement;

const rootStyle = css`
  color: ${COLOR.kurlyGray450};
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

const Description = forwardRef<Ref, CustomStylingProps>(({ style, className }, ref) => {
  const { product } = useProductCardBase();
  const { description } = product;

  if (!description) return null;

  return (
    <p ref={ref} className={clsx(rootStyle, className)} style={style}>
      {description}
    </p>
  );
});

Description.displayName = 'Description';

export { Description };
