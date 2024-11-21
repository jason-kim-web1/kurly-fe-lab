import { createContext, forwardRef, PropsWithChildren, useContext } from 'react';

import { Impression } from './Impression';
import type { ShortCutType } from '@productCard/types/shortcut';
import type { SnakeCaseStickerList } from '@productCard/types/sticker';
import { Box } from '@productCard/components/Box';
import { Description } from '@productCard/components/Description';
import { DiscountedPrice } from '@productCard/components/DiscountedPrice';
import { DiscountRate } from '@productCard/components/DiscountRate';
import { Image } from '@productCard/components/Image';
import { Link } from '@productCard/components/Link';
import { Name } from '@productCard/components/Name';
import { QuantityChip } from '@productCard/components/QuantityChip';
import { ReviewCount } from '@productCard/components/ReviewCount';
import { SalesPrice } from '@productCard/components/SalesPrice';
import { ShortCut } from '@productCard/components/ShortCut';

import { ProductContainer } from 'app/styles';
import { isNotFunction } from '@productCard/utils/lodash-extends';

type CardProduct = {
  id: string;
  productCode: number;
  name: string;
  description: string;
  imageUrl: string;
  shortCutType: ShortCutType;
  reviewCount: string;
  stickers?: SnakeCaseStickerList;

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
    if (isNotFunction(onVisibleStateChange)) {
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
