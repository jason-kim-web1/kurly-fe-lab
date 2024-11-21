import Link, { LinkProps } from 'next/link';
import React from 'react';

import { checkPhpResource } from '@productCard/utils/checkPhpResource';

export default function NextLink(props: React.PropsWithChildren<LinkProps>) {
  const { href, children } = props;
  const hrefStr = href.toString();
  const isPhpResource = checkPhpResource(hrefStr);
  if (isPhpResource) {
    return <a href={hrefStr}>{children}</a>;
  }
  return (
    <Link {...props} legacyBehavior>
      {children}
    </Link>
  );
}
