import { z } from 'zod';

const LegacyStickerScheme = z.object({
  content: z.array(
    z.object({
      text: z.string(),
      weight: z.string(),
    }),
  ),
  opacity: z.number(),
  background_color: z.string(),
});

const StickerTypeEnum = z.enum(['TOP_LEFT_TEXT', 'BOTTOM_CENTER_TEXT', 'BOTTOM_RIGHT_IMAGE', 'BOTTOM_LEFT_IMAGE']);

const TextStickerTypeEnum = z.enum([StickerTypeEnum.enum.TOP_LEFT_TEXT, StickerTypeEnum.enum.BOTTOM_CENTER_TEXT]);

const ImageStickerTypeEnum = z.enum([StickerTypeEnum.enum.BOTTOM_LEFT_IMAGE, StickerTypeEnum.enum.BOTTOM_RIGHT_IMAGE]);

const TextContentScheme = z.object({
  text: z.string(),
  font_color_code: z.string(),
  font_effect: z.string(),
  font_style: z.string(),
  opacity: z.number(),
});

const TextStickerContentScheme = z.object({
  contents: z.array(TextContentScheme),
  background_color_code: z.string(),
  background_opacity: z.number(),
});

const TextStickerScheme = z.object({
  type: TextStickerTypeEnum,
  content: TextStickerContentScheme,
});

const ImageStickerContentScheme = z.object({
  image_url: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  opacity: z.number(),
});

const ImageStickerScheme = z.object({
  type: ImageStickerTypeEnum,
  content: ImageStickerContentScheme,
});

const StickerScheme = z.discriminatedUnion('type', [TextStickerScheme, ImageStickerScheme]);
const StickerListScheme = z.array(StickerScheme);

type LegacySticker = z.infer<typeof LegacyStickerScheme>;
type StickerType = z.infer<typeof StickerTypeEnum>;
type StickerList = z.infer<typeof StickerListScheme>;
type Sticker = z.infer<typeof StickerScheme>;
type ImageSticker = z.infer<typeof ImageStickerScheme>;
type TextSticker = z.infer<typeof TextStickerScheme>;

export { LegacyStickerScheme, StickerListScheme, StickerScheme, StickerTypeEnum };
export type { ImageSticker, LegacySticker, Sticker, StickerList, StickerType, TextSticker };
