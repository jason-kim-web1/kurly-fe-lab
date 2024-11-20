import { css } from '@emotion/css';
import { eq } from 'lodash';

import NextImage from '../../../NextImage';
import { ProductImageType } from '../../constants';
import { useProductImageBase } from '../../ProductImageBase';
import type { ChildrenOnly } from '../../types';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { isPC } from '@shared/utils/getDevice';

const rootStyle = css`
  &:hover {
    img {
      transform: scale(1.02);
      transition: all 0.3s ease-in-out 0s;
    }
  }
`;

const AspectRatio = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const getBorderRadiusStyle = (isProductDetail: boolean) => {
  if (!isProductDetail) return '4px';
  return isPC ? '6px' : '0px';
};

export const Image = ({ children }: ChildrenOnly) => {
  const { src, imageMetaData, type } = useProductImageBase();
  const isProductDetail = eq(type, ProductImageType.PRODUCT_DETAIL);
  const styleClass = clsx(isProductDetail ? null : rootStyle);
  const { width, height } = imageMetaData;
  const style = {
    paddingBottom: `${100 / (width / height)}%`,
    borderRadius: getBorderRadiusStyle(isProductDetail),
  };

  return (
    <AspectRatio className={styleClass} style={style}>
      <NextImage src={src} layout="fill" objectFit="cover" disableImageDrag />
      {children}
    </AspectRatio>
  );
};
