import clsx from 'clsx';
import { isFunction } from 'lodash';
import { forwardRef, PropsWithChildren } from 'react';

import { CustomStylingProps } from '@productCard/types';
import { useProductCardBase } from '@productCard/ProductCardBase';
import { checkPhpResource } from '@shared/utils/checkPhpResource';
import Link from 'next/link';

type Ref = HTMLAnchorElement;

const ProductLink = forwardRef<Ref, PropsWithChildren<CustomStylingProps>>(({ children, className, style }, ref) => {
  const { product, onClick } = useProductCardBase();
  const { productCode } = product;
  const href = productCode ? `/goods/${productCode}` : '#';
  const isPhpResource = checkPhpResource(href);

  if (isPhpResource) {
    return <a href={href}>{children}</a>;
  }

  return (
    <Link href={href} prefetch={false} legacyBehavior>
      <a
        ref={ref}
        href={href}
        onClick={() => {
          if (isFunction(onClick)) onClick(product);
        }}
        className={clsx(className)}
        style={style}
      >
        {children}
      </a>
    </Link>
  );
});

ProductLink.displayName = 'ProductLink';

export { ProductLink };
