import {
  camelCase,
  entries,
  eq,
  fromPairs,
  get,
  head,
  isArray,
  isBoolean,
  isEmpty,
  isNull,
  isNumber,
  isString,
  isUndefined,
  map,
  some
} from 'lodash';
import curry from 'lodash/fp/curry';

import {
  ImageSticker,
  SnakeCaseImageSticker,
  SnakeCaseSticker,
  SnakeCaseStickerList,
  SnakeCaseTextSticker,
  Sticker,
  StickerList,
  StickerTypeEnum,
  TextSticker,
} from '@productCard/types/sticker';

export const isImageSticker = (sticker: Sticker): sticker is ImageSticker =>
  some([StickerTypeEnum.BOTTOM_LEFT_IMAGE, StickerTypeEnum.BOTTOM_RIGHT_IMAGE], (type) =>
    eq(get(sticker, 'type'), type),
  );

export const isTextSticker = (sticker: Sticker): sticker is TextSticker =>
  some([StickerTypeEnum.TOP_LEFT_TEXT, StickerTypeEnum.BOTTOM_CENTER_TEXT], (type) => eq(get(sticker, 'type'), type));

const isStickerType = curry((type: StickerTypeEnum, target: unknown) => eq(type, target));

export const isTopLeftTextSticker = isStickerType(StickerTypeEnum.TOP_LEFT_TEXT);
export const isBottomCenterTextSticker = isStickerType(StickerTypeEnum.BOTTOM_CENTER_TEXT);
export const isBottomLeftImageSticker = isStickerType(StickerTypeEnum.BOTTOM_LEFT_IMAGE);
export const isBottomRightImageSticker = isStickerType(StickerTypeEnum.BOTTOM_RIGHT_IMAGE);

const isSnakeCaseImageSticker = (sticker: SnakeCaseSticker): sticker is SnakeCaseImageSticker =>
  some([StickerTypeEnum.BOTTOM_LEFT_IMAGE, StickerTypeEnum.BOTTOM_RIGHT_IMAGE], (type) =>
    eq(get(sticker, 'type'), type),
  );

const isSnakeCaseTextSticker = (sticker: SnakeCaseSticker): sticker is SnakeCaseTextSticker =>
  some([StickerTypeEnum.TOP_LEFT_TEXT, StickerTypeEnum.BOTTOM_CENTER_TEXT], (type) => eq(get(sticker, 'type'), type));

const checkValueIsPrimitiveType = (value: unknown) =>
  !!(isString(value) || isNumber(value) || isBoolean(value) || isNull(value) || isUndefined(value) || isEmpty(value));

function snakeToCamel<T>(data: unknown): T {
  return fromPairs(
    map(entries(data as object), (item) => {
      const [key, value] = item;
      const camelCasedKey = camelCase(key);
      if (checkValueIsPrimitiveType(value)) {
        return [camelCasedKey, value];
      }
      if (isArray(value)) {
        const firstElement = head(value);
        if (checkValueIsPrimitiveType(firstElement)) {
          return [camelCasedKey, value];
        }
        return [camelCasedKey, map(value, (valueItem) => snakeToCamel(valueItem))];
      }
      return [camelCasedKey, snakeToCamel(value)];
    }),
  ) as T;
}

const transformSnakeCaseImageSticker = (sticker: SnakeCaseImageSticker): ImageSticker =>
  snakeToCamel<ImageSticker>(sticker);

const transformSnakeCaseTextSticker = (sticker: SnakeCaseTextSticker): TextSticker =>
  snakeToCamel<TextSticker>(sticker);

const transformSnakeCaseSticker = (sticker: SnakeCaseSticker): Sticker | null => {
  if (isSnakeCaseImageSticker(sticker)) {
    return transformSnakeCaseImageSticker(sticker);
  }
  if (isSnakeCaseTextSticker(sticker)) {
    return transformSnakeCaseTextSticker(sticker);
  }
  return null;
};

export const transformSnakeCaseStickerList = (stickerList: SnakeCaseStickerList): StickerList =>
  {
    return stickerList.map(sticker => transformSnakeCaseSticker(sticker)).filter(sticker => !!sticker);
  }
