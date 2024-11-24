import { css } from '@emotion/react';
import { isEmpty } from 'lodash';
import Image, { ImageProps } from 'next/legacy/image';
import { SyntheticEvent, useEffect, useState } from 'react';

import { NoMainImageLogo } from '../../../../../assets/img/images';
import { isNotFunction } from '../../../../../utils/lodash-extends';

const imageDisSelectStyle = css`
  user-select: none;
  -webkit-user-drag: none;
`;

interface Props extends ImageProps {
  disableImageDrag?: boolean;
  fallbackImageSrc?: string;
}

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
    if (isNotFunction(onError)) {
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
    <Image
      {...otherProps}
      src={internalSrc}
      loader={({ src }) => src}
      css={disableImageDrag ? imageDisSelectStyle : {}}
      onErrorCapture={handleErrorCapture}
    />
  );
};

export default NextImage;
