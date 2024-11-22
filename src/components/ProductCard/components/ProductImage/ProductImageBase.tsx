import { get, isEmpty } from 'lodash';
import { createContext, PropsWithChildren, useContext } from 'react';

import type { StickerList as StickerListType } from '@productCard/types/sticker';
import { Image } from './components/Image';
import { SoldOut } from './components/SoldOut';
import { Sticker } from './components/Sticker';
import { Platform, ProductImageMetaDataDictionary, ProductImageType } from './constants';
import type { ProductImageMetaData } from './types';

const getProductImageMetaData = (platform: Platform, type: ProductImageType): ProductImageMetaData => {
  const metaData = get(get(ProductImageMetaDataDictionary, type), platform);
  if (metaData) return metaData;
  return ProductImageMetaDataDictionary[ProductImageType.PRODUCT_LIST_ITEM][platform];
};

export interface ProductImageBaseState {
  src: string;
  type: ProductImageType;
  stickerList?: StickerListType;
  isSoldOut?: boolean;
  soldOutTitle?: string;
  soldOutMessage?: string;
  platform: Platform;
  imageMetaData: ProductImageMetaData;
}

const ProductImageBaseContext = createContext<ProductImageBaseState | null>(null);

export const useProductImageBase = () => {
  const context = useContext(ProductImageBaseContext);
  if (!context) {
    throw new Error('useProductImageBase 하위에서만 사용 가능합니다.');
  }
  return context;
};

export type ProductImageBaseProps = PropsWithChildren<Omit<ProductImageBaseState, 'imageMetaData'>>;

const ProductImageBase = ({
  src,
  type,
  stickerList,
  isSoldOut = false,
  soldOutTitle,
  soldOutMessage,
  children,
  platform
}: ProductImageBaseProps) => {
  return (
    <ProductImageBaseContext.Provider
      value={{
        src,
        type,
        stickerList,
        isSoldOut,
        platform,
        imageMetaData: getProductImageMetaData(platform, type),
        soldOutTitle,
        soldOutMessage,
      }}
    >
      {children}
    </ProductImageBaseContext.Provider>
  );
};

const StickerList = () => {
  const { stickerList } = useProductImageBase();
  if (!stickerList || isEmpty(stickerList)) {
    return null;
  }
  return (
    <>
      {stickerList.map((sticker, i) => (
        <Sticker key={i} sticker={sticker} />
      ))}
    </>
  );
};

ProductImageBase.Image = Image;
ProductImageBase.SoldOut = SoldOut;
ProductImageBase.StickerList = StickerList;

export { Image, ProductImageBase, SoldOut, StickerList };
