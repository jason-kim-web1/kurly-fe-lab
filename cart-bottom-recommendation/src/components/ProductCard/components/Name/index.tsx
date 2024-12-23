import { css } from '@emotion/css';
import clsx from 'clsx';
import { forwardRef } from 'react';

import { CustomStylingProps } from '../../types/common';
import { useProductCardBase } from '../ProductCardBase';
import COLOR from '../../constants/colorset';

type Ref = HTMLHeadingElement;

type NameImplProps = CustomStylingProps & {
  name: string;
};

const rootStyle = css`
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  display: -webkit-box;
  overflow: hidden;
  word-break: break-all;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const NameImpl = forwardRef<Ref, NameImplProps>(({ name, className, style }, ref) => (
  <h4 ref={ref} className={clsx(rootStyle, className)} style={style}>
    {name}
  </h4>
));

const Name = forwardRef<Ref, CustomStylingProps>(({ className, style }, ref) => {
  const {
    product: { name },
  } = useProductCardBase();
  if (!name) {
    return null;
  }
  return <NameImpl ref={ref} name={name} className={className} style={style} />;
});

NameImpl.displayName = 'NameImpl';
Name.displayName = 'Name';

export { Name };
