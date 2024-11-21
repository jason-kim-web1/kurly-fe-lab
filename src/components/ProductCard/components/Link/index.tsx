import clsx from 'clsx';
import { forwardRef, MouseEventHandler, PropsWithChildren } from 'react';

import { CustomStylingProps } from '@productCard/types/common';
import { useProductCardBase } from '../ProductCardBase';
import NextLink from './NextLink';
import { isNotFunction } from '@productCard/utils/lodash-extends';

type Ref = HTMLAnchorElement;

type LinkImplProps = CustomStylingProps & {
  href: string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
};

const LinkImpl = forwardRef<Ref, PropsWithChildren<LinkImplProps>>(
  ({ className, style, href, onClick, children }, ref) => (
    <NextLink href={href} prefetch={false}>
      <a ref={ref} href={href} onClick={onClick} className={clsx(className)} style={style}>
        {children}
      </a>
    </NextLink>
  ),
);

const Link = forwardRef<Ref, PropsWithChildren<CustomStylingProps>>(({ children, className, style }, ref) => {
  const { product, onClick } = useProductCardBase();
  const { productCode } = product;

  const handleClick: MouseEventHandler<HTMLAnchorElement> = () => {
    if (isNotFunction(onClick)) {
      return;
    }
    onClick(product);
  };

  return (
    <LinkImpl
      ref={ref}
      className={className}
      href={productCode ? `/goods/${productCode}` : '#'}
      onClick={handleClick}
      style={style}
    >
      {children}
    </LinkImpl>
  );
});

LinkImpl.displayName = 'LinkImpl';
Link.displayName = 'Link';

export { Link };
