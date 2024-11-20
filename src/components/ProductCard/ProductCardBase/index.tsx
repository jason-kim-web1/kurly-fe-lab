import { isFunction } from 'lodash';
import { createContext, forwardRef, PropsWithChildren, useContext } from 'react';

import { Impression } from '@features/recommendation-section/components/Impression';
import type { ShortCutType } from 'shared/lib/ShortCut';
import type { StickerList } from 'shared/lib/Sticker';
import { Box } from '@productCard/Box';
import { Description } from '@productCard/Description';
import { DiscountedPrice } from '@productCard/DiscountedPrice';
import { DiscountRate } from '@productCard/DiscountRate';
import { Image } from '@productCard/Image';
import { Link } from '@productCard/Link';
import { Name } from '@productCard/Name';
import { QuantityChip } from '@productCard/QuantityChip';
import { ReviewCount } from '@productCard/ReviewCount';
import { SalesPrice } from '@productCard/SalesPrice';
import { ShortCut } from '@productCard/ShortCut';

import { ProductContainer } from 'app/styles';

type CardProduct = {
  id: string;
  productCode: number;
  name: string;
  description: string;
  imageUrl: string;
  shortCutType: ShortCutType;
  reviewCount: string;
  stickers?: StickerList;

  // 가격정보
  isMultiplePrice: boolean;
  salesPrice: number;
  discountedPrice?: number | null;
  discountRate: number;

  // 품절여부
  isSoldOut?: boolean;
  soldOutTitle?: string;
  soldOutText?: string;

  // 수량정보
  quantity?: number;
};

type BaseContext = {
  product: CardProduct;
  onClick?: (product: CardProduct) => void;
  onVisibleStateChange?: (product: CardProduct, visible: boolean) => void;
  onClickShortCut?: (product: CardProduct, shortCutType: ShortCutType) => void;
};

const ProductCardBaseContext = createContext<BaseContext | null>(null);

const useProductCardBase = () => {
  const context = useContext(ProductCardBaseContext);
  if (!context) {
    throw new Error('useProductCardContext 훅은 ProductCardContext 하위에서만 사용 가능합니다.');
  }
  return { ...context } as const;
};

type Ref = HTMLElement;
type ProductCardBaseProps = PropsWithChildren<BaseContext>;

const ProductCardBaseImpl = forwardRef<Ref, ProductCardBaseProps>(({ children, ...other }, ref) => {
  const { onVisibleStateChange, product } = other;
  const handleVisible = (visible: boolean) => {
    if (!isFunction(onVisibleStateChange)) {
      return;
    }
    onVisibleStateChange(product, visible);
  };
  return (
    <ProductCardBaseContext.Provider value={other}>
      <Impression onInViewStateChange={handleVisible}>
        <ProductContainer ref={ref}>{children}</ProductContainer>
      </Impression>
    </ProductCardBaseContext.Provider>
  );
});

const ProductCardBase = {
  Root: ProductCardBaseImpl,
  Name,
  ReviewCount,
  Description,
  ShortCut,
  Image,
  SalesPrice,
  DiscountRate,
  DiscountedPrice,
  Link,
  Box,
  QuantityChip,
};

ProductCardBaseImpl.displayName = 'ProductCardBaseImpl';

export { ProductCardBase, useProductCardBase };
export type { CardProduct, ProductCardBaseProps };
