import { css } from '@emotion/react';

import { ImageSticker } from '../../../../../../types/sticker';
import NextImage from '../../NextImage';
import { useProductImageBase } from '../../../ProductImageBase';
import styled from '@emotion/styled';

const rootStyle = css`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 172px;
`;

const AspectRatio = styled.div`
  padding-bottom: 100%;
  position: relative;
  width: 100%;
`;

interface Props {
  sticker: ImageSticker;
}

export const BottomRightImageSticker = ({ sticker }: Props) => {
  const { imageMetaData } = useProductImageBase();
  const { bottomRightImageSticker } = imageMetaData;
  const { width } = bottomRightImageSticker;
  const { content } = sticker;
  const { imageUrl, opacity } = content;
  return (
    <div css={rootStyle} style={{ width, opacity }}>
      <AspectRatio>
        <NextImage src={imageUrl} layout="fill" objectFit="cover" disableImageDrag />
      </AspectRatio>
    </div>
  );
};
