'use client';

import { CollectionSectionProductCard, MdChoiceProductCard, SpecialDealProductCard } from '@productCard/index';

import { Container } from './styles';
import products from './products';

export default function Page() {
  return (
    <>
      <Container>
        {products.map(product => (
          <CollectionSectionProductCard key={product.id} product={product} />
        ))}
      </Container>
      {/* <Container>
        {products.map(product => (
          <MdChoiceProductCard key={product.id} product={product} />
        ))}
      </Container>
      <Container>
        {products.map(product => (
          <SpecialDealProductCard key={product.id} product={product} />
        ))}
      </Container> */}
    </>
    
  );
}
