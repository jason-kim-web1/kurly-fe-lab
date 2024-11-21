import { css } from '@emotion/react';
import { isEmpty, isFunction } from 'lodash';
import Image, { ImageProps } from 'next/legacy/image';
import { SyntheticEvent, useEffect, useState } from 'react';

import { NoMainImageLogo } from '@productCard/constants/images';
import imageLoader from '@productCard/utils/image-loader';
import styled from '@emotion/styled';

const imageDisSelectStyle = css`
  user-select: none;
  -webkit-user-drag: none;
`;

interface Props extends ImageProps {
  disableImageDrag?: boolean;
  fallbackImageSrc?: string;
}

const StyledImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const NextImage = ({
  disableImageDrag = false,
  fallbackImageSrc = NoMainImageLogo,
  onError,
  src,
  ...otherProps
}: Props) => {
  const [internalSrc, setInternalSrc] = useState(src);
  const handleErrorCapture = (event: SyntheticEvent<HTMLImageElement>) => {
    setInternalSrc(fallbackImageSrc);
    if (!isFunction(onError)) {
      return;
    }
    onError(event);
  };

  useEffect(() => {
    if (isEmpty(src)) {
      setInternalSrc(fallbackImageSrc);
      return;
    }
    setInternalSrc(src);
  }, [src]);

  if (isEmpty(internalSrc)) {
    return null;
  }

  return (
    <StyledImage
      {...otherProps}
      src={internalSrc}
      loader={imageLoader}
      css={disableImageDrag ? imageDisSelectStyle : {}}
      onErrorCapture={handleErrorCapture}
    />
  );
};

export default NextImage;
