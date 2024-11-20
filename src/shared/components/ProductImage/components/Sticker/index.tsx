import type { Sticker as StickerType } from '@shared/types/sticker';
import { isImageSticker, isTextSticker } from '@shared/utils/sticker';
import { ImageTypeSticker } from './image';
import { TextTypeSticker } from './text';

interface Props {
  sticker: StickerType;
}

export const Sticker = ({ sticker }: Props) => {
  if (isTextSticker(sticker)) {
    return <TextTypeSticker sticker={sticker} />;
  }
  if (isImageSticker(sticker)) {
    return <ImageTypeSticker sticker={sticker} />;
  }
  return null;
};
