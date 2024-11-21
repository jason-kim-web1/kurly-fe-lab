'use client';

import { css } from '@emotion/css';
import clsx from 'clsx';

import { ProductCardBase, ProductCardBaseProps } from './components/ProductCardBase';
import { ProductImageType } from '@shared/components/ProductImage/constants';

const flexRowStyle = css`
  display: flex;
  flex-direction: row;
`;

const alignCenterStyle = css`
  align-items: center;
`;

const CollectionSectionProductCard = (props: ProductCardBaseProps) => (
  <ProductCardBase.Root {...props}>
    <ProductCardBase.Link>
      <ProductCardBase.Box style={{ marginBottom: '6px' }}>
        <ProductCardBase.Image type={ProductImageType.MAIN_PRODUCT_LIST_ITEM} />
      </ProductCardBase.Box>
      <ProductCardBase.Box style={{ marginBottom: '8px' }}>
        <ProductCardBase.ShortCut />
      </ProductCardBase.Box>
      <ProductCardBase.Box style={{ marginTop: '2px' }}>
        <ProductCardBase.Name />
      </ProductCardBase.Box>
      <ProductCardBase.DiscountedPrice />
      <ProductCardBase.Box
        className={clsx(flexRowStyle, alignCenterStyle)}
        style={{
          gap: '2px',
        }}
      >
        <ProductCardBase.DiscountRate />
        <ProductCardBase.SalesPrice />
      </ProductCardBase.Box>
      <ProductCardBase.Box style={{ marginTop: '8px' }}>
        <ProductCardBase.ReviewCount />
      </ProductCardBase.Box>
    </ProductCardBase.Link>
  </ProductCardBase.Root>
);

const MdChoiceProductCard = (props: ProductCardBaseProps) => (
  <ProductCardBase.Root {...props}>
    <ProductCardBase.Link>
      <ProductCardBase.Box style={{ marginBottom: '6px' }}>
        <ProductCardBase.Image type={ProductImageType.MAIN_MD_CHOICE_ITEM} />
      </ProductCardBase.Box>
      <ProductCardBase.Box style={{ marginBottom: '8px' }}>
        <ProductCardBase.ShortCut />
      </ProductCardBase.Box>
      <ProductCardBase.Box style={{ marginBottom: '4px' }}>
        <ProductCardBase.Name />
      </ProductCardBase.Box>
      <ProductCardBase.Box style={{ marginTop: '2px' }}>
        <ProductCardBase.DiscountedPrice />
      </ProductCardBase.Box>
      <ProductCardBase.Box
        className={clsx(flexRowStyle, alignCenterStyle)}
        style={{
          gap: '2px',
        }}
      >
        <ProductCardBase.DiscountRate />
        <ProductCardBase.SalesPrice />
      </ProductCardBase.Box>
    </ProductCardBase.Link>
  </ProductCardBase.Root>
);

const SpecialDealProductCard = (props: ProductCardBaseProps) => (
  <ProductCardBase.Root {...props}>
    <ProductCardBase.Link>
      <ProductCardBase.Box style={{ marginBottom: '6px' }}>
        <ProductCardBase.Image type={ProductImageType.MAIN_SPECIAL_DEAL_ITEM} />
      </ProductCardBase.Box>
      <ProductCardBase.ShortCut />
      <ProductCardBase.Box style={{ marginTop: '8px' }}>
        <ProductCardBase.Box style={{ marginBottom: '4px' }}>
          <ProductCardBase.Description />
        </ProductCardBase.Box>
        <ProductCardBase.Name />
      </ProductCardBase.Box>
      <ProductCardBase.Box
        className={clsx(flexRowStyle, alignCenterStyle)}
        style={{
          justifyContent: 'space-between',
        }}
      >
        <ProductCardBase.Box
          className={clsx(flexRowStyle, alignCenterStyle)}
          style={{
            marginTop: '4px',
            gap: '4px',
            flexShrink: 0,
          }}
        >
          <ProductCardBase.DiscountRate />
          <ProductCardBase.SalesPrice />
          <ProductCardBase.DiscountedPrice />
        </ProductCardBase.Box>
        <ProductCardBase.QuantityChip style={{ flexShrink: 0 }} />
      </ProductCardBase.Box>

      <ProductCardBase.Box style={{ marginTop: '8px' }}>
        <ProductCardBase.ReviewCount />
      </ProductCardBase.Box>
    </ProductCardBase.Link>
  </ProductCardBase.Root>
);

export * from './components/ProductCardBase/Impression';

export { CollectionSectionProductCard, MdChoiceProductCard, SpecialDealProductCard };
