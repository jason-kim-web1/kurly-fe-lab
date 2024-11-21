import type { TextSticker } from '@productCard/types/sticker';
import { isBottomCenterTextSticker, isTopLeftTextSticker } from '@productCard/utils/sticker';
import { BottomCenterTextSticker } from './BottomCenterTextSticker';
import { TopLeftTextSticker } from './TopLeftTextSticker';

interface Props {
  sticker: TextSticker;
}

export const TextTypeSticker = ({ sticker }: Props) => {
  const { type } = sticker;
  if (isTopLeftTextSticker(type)) {
    return <TopLeftTextSticker sticker={sticker} />;
  }
  if (isBottomCenterTextSticker(type)) {
    return <BottomCenterTextSticker sticker={sticker} />;
  }
  return null;
};
