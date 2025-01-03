import { ImageSticker } from '../../../../../../types/sticker';
import { isBottomLeftImageSticker, isBottomRightImageSticker } from '../../../../../../utils/sticker';
import { BottomLeftImageSticker } from './BottomLeftImageSticker';
import { BottomRightImageSticker } from './BottomRightImageSticker';

export interface ImageTypeStickerProps {
  sticker: ImageSticker;
}

export const ImageTypeSticker = ({ sticker }: ImageTypeStickerProps) => {
  const { type } = sticker;
  if (isBottomLeftImageSticker(type)) {
    return <BottomLeftImageSticker sticker={sticker} />;
  }
  if (isBottomRightImageSticker(type)) {
    return <BottomRightImageSticker sticker={sticker} />;
  }
  return null;
};
