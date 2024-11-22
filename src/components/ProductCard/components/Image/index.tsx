import { useProductCardBase } from '../ProductCardBase';
import { ProductImage } from '@productCard/components/ProductImage';
import { Platform, ProductImageType } from '@productCard/components/ProductImage/constants';
import { transformSnakeCaseStickerList } from '@productCard/utils/sticker';
import { SnakeCaseStickerList } from '@productCard/types/sticker';

// TODO: Forward Ref 적용

type Props = {
  imageUrl: string;
  type: ProductImageType;
  isSoldOut: boolean;
  soldOutText?: string;
  soldOutTitle?: string;
  stickers: SnakeCaseStickerList;
  platform: Platform
};

const ImageImpl = ({ imageUrl, type, isSoldOut, soldOutText, soldOutTitle, stickers, platform }: Props) => {
  const stickerList = (stickers && stickers.length > 0) ? transformSnakeCaseStickerList(stickers) : [];

  return (
    <ProductImage
      src={imageUrl}
      type={type}
      soldOutTitle={soldOutTitle}
      soldOutMessage={soldOutText}
      isSoldOut={isSoldOut}
      stickerList={stickerList}
      platform={platform}
    />
  );
};

type ImageProps = {
  type?: ProductImageType;
};

const Image = ({ type = ProductImageType.PRODUCT_LIST_ITEM }: ImageProps) => {
  const {
    product: { imageUrl, stickers, isSoldOut, soldOutTitle, soldOutText },
    platform,
  } = useProductCardBase();
  return (
    <ImageImpl
      type={type}
      imageUrl={imageUrl}
      stickers={stickers || []}
      isSoldOut={isSoldOut || false}
      soldOutText={soldOutText}
      soldOutTitle={soldOutTitle}
      platform={platform}
    />
  );
};

export { Image };
