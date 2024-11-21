import { css } from '@emotion/css';
import clsx from 'clsx';
import { forwardRef } from 'react';

import { CustomStylingProps } from '@productCard/types';
import { useProductCardBase } from '@productCard/ProductCardBase';
import COLOR from '@shared/constants/colorset';
import { multiMaxLineText } from '@shared/utils/text-formatter';

type Ref = HTMLHeadingElement;

const rootStyle = css`
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  ${multiMaxLineText(2)};
`;

const Name = forwardRef<Ref, CustomStylingProps>(({ className, style }, ref) => {
  const { product } = useProductCardBase();
  const { name } = product;

  if (!name) return null;
  return (
    <h4 ref={ref} className={clsx(rootStyle, className)} style={style}>
      {name}
    </h4>
  );
});

Name.displayName = 'Name';

export { Name };
