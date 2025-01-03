import { css } from '@emotion/css';
import clsx from 'clsx';
import { CSSProperties, forwardRef, PropsWithChildren } from 'react';

type BoxProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string | undefined;
}>;

type Ref = HTMLDivElement;

const rootStyle = css`
  &:empty {
    display: none;
  }
`;

const Box = forwardRef<Ref, BoxProps>(({ className, style, children }, ref) => (
  <div ref={ref} className={clsx(rootStyle, className)} style={style}>
    {children}
  </div>
));

Box.displayName = 'Box';
export { Box };
