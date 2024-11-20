import { createContext, forwardRef } from 'react';
import { ProductCardBaseProps } from '.';
import { isFunction } from 'lodash';
import { BaseContext } from 'components/ProductCard_custom/types';
import { Impression } from '@features/recommendation-section/components/Impression';

type Ref = HTMLElement;

const ProductCardBaseContext = createContext<BaseContext | null>(null);

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
        <article ref={ref}>{children}</article>
      </Impression>
    </ProductCardBaseContext.Provider>
  );
});

ProductCardBaseImpl.displayName = 'ProductCardBaseImpl';

export default ProductCardBaseImpl;
