import clsx from 'clsx';
import { isFunction } from 'lodash';
import { forwardRef, MouseEventHandler, PropsWithChildren } from 'react';

import { CustomStylingProps } from '@shared/type';
import { useProductCardBase } from '@productCard/ProductCardBase';
import NextLink from '@shared/components/NextLink';

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
    if (!isFunction(onClick)) {
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
