import styled from '@emotion/styled';
import { eq, head } from 'lodash';

import type { TextSticker } from '../../../../../../types/sticker';
import { hexToRgba } from '../../../../../../utils/color';
import { ProductImageType } from '../../../constants';
import { useProductImageBase } from '../../../ProductImageBase';

const Root = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
`;

const Text = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
`;

interface Props {
  sticker: TextSticker;
}

// NOTE: TOP_LEFT 스티커와 대부분 동일하고 스타일만 다름
export const BottomCenterTextSticker = ({ sticker }: Props) => {
  const { content } = sticker;
  const { contents, backgroundOpacity, backgroundColorCode } = content;
  const firstContent = head(contents);
  const { type, imageMetaData } = useProductImageBase();
  const { bottomCenterTextSticker } = imageMetaData;
  const {
    padding: { x, y },
    fontStyle,
  } = bottomCenterTextSticker;
  const shouldNotRenderSticker = eq(type, ProductImageType.MAIN_MD_CHOICE_ITEM);
  if (!firstContent || shouldNotRenderSticker) {
    return null;
  }
  const { text, fontColorCode, opacity } = firstContent;
  const backgroundColor = hexToRgba(backgroundColorCode, backgroundOpacity);
  const color = hexToRgba(fontColorCode, opacity);
  return (
    <Root style={{ backgroundColor, padding: `${y}px ${x}px` }}>
      <Text style={{ color, ...fontStyle }}>{text}</Text>
    </Root>
  );
};
