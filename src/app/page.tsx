'use client';

import { CollectionSectionProductCard } from '@productCard/index';

import { Container } from './styles';
import products from './products';

export default function Page() {
  return (
    <Container>
      {products.map(product => (
        <CollectionSectionProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
}
