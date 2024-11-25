export const StickerType = {
  TOP_LEFT_TEXT: 'TOP_LEFT_TEXT',
  BOTTOM_CENTER_TEXT: 'BOTTOM_CENTER_TEXT',
  BOTTOM_RIGHT_IMAGE: 'BOTTOM_RIGHT_IMAGE',
  BOTTOM_LEFT_IMAGE: 'BOTTOM_LEFT_IMAGE',
} as const;

export type SnakeCaseTextStickerInnerContent = {
  text: string;
  font_color_code: string;
  font_effect: string;
  font_style: string;
  opacity: number;
};

export type TextStickerInnerContent = {
  text: string;
  fontColorCode: string;
  fontEffect: string;
  fontStyle: string;
  opacity: number;
};

export type SnakeCaseTextStickerContent = {
  contents: SnakeCaseTextStickerInnerContent[];
  background_color_code: string;
  background_opacity: number;
};

export type TextStickerContent = {
  contents: TextStickerInnerContent[];
  backgroundColorCode: string;
  backgroundOpacity: number;
};

interface BaseSticker {
  type: unknown;
  content: unknown;
}

export interface SnakeCaseTextSticker extends BaseSticker {
  type: typeof StickerType.TOP_LEFT_TEXT | typeof StickerType.BOTTOM_CENTER_TEXT;
  content: SnakeCaseTextStickerContent;
}

export interface TextSticker extends BaseSticker {
  type: typeof StickerType.TOP_LEFT_TEXT | typeof StickerType.BOTTOM_CENTER_TEXT;
  content: TextStickerContent;
}

export type SnakeCaseImageStickerContent = {
  image_url: string;
  width?: number;
  height?: number;
  opacity: number;
};

export type ImageStickerContent = {
  imageUrl: string;
  width?: number;
  height?: number;
  opacity: number;
};

export interface SnakeCaseImageSticker extends BaseSticker {
  type: typeof StickerType.BOTTOM_LEFT_IMAGE | typeof StickerType.BOTTOM_RIGHT_IMAGE;
  content: SnakeCaseImageStickerContent;
}

export interface ImageSticker extends BaseSticker {
  type: typeof StickerType.BOTTOM_LEFT_IMAGE | typeof StickerType.BOTTOM_RIGHT_IMAGE;
  content: ImageStickerContent;
}

export type SnakeCaseSticker = SnakeCaseTextSticker | SnakeCaseImageSticker;
export type SnakeCaseStickerList = SnakeCaseSticker[];

export type Sticker = TextSticker | ImageSticker;
export type StickerList = Sticker[];
