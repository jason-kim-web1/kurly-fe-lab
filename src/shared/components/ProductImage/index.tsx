import { ne } from '@shared/utils/lodash-extends';
import { ProductImageType } from './constants';
import { ProductImageBase, ProductImageBaseProps } from './ProductImageBase';

export const ProductImage = (props: ProductImageBaseProps) => {
  const { type, isSoldOut } = props;
  const shouldRenderStickerList = ne(type, ProductImageType.MAIN_RANDOM_COLLECTION_ARTICLE_ITEM);
  return (
    <ProductImageBase {...props}>
      <ProductImageBase.Image>
        {shouldRenderStickerList ? <ProductImageBase.StickerList /> : null}
        {isSoldOut ? <ProductImageBase.SoldOut /> : null}
      </ProductImageBase.Image>
    </ProductImageBase>
  );
};
