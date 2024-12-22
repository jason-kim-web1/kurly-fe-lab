import { createContext, forwardRef, PropsWithChildren, useContext } from 'react';

import { Impression } from './Impression';
import type { ShortCutType } from '../../types/shortcut';
import type { SnakeCaseStickerList } from '../../types/sticker';
import { Box } from '../../components/Box';
import { Description } from '../../components/Description';
import { DiscountedPrice } from '../../components/DiscountedPrice';
import { DiscountRate } from '../../components/DiscountRate';
import { Image } from '../../components/Image';
import { Link } from '../../components/Link';
import { Name } from '../../components/Name';
import { QuantityChip } from '../../components/QuantityChip';
import { ReviewCount } from '../../components/ReviewCount';
import { SalesPrice } from '../../components/SalesPrice';
import { ShortCut } from '../../components/ShortCut';

import { ProductContainer } from 'app/styles';
import { isNotFunction } from '../../utils/lodash-extends';
import { Platform } from '../Image/ProductImage/constants';

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
  platform: Platform;
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
