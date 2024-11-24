'use client';

import { CollectionSectionProductCard } from '../components/ProductCard/index';
import { Container } from './styles';
import products from './products';
import { Platform } from '../components/ProductCard/components/Image/ProductImage/constants';

export default function Page() {
  return (
    <Container>
      {products.map(product => (
        <CollectionSectionProductCard
          key={product.id}
          product={product}
          platform={Platform.MOBILE}
        />
      ))}
    </Container>
  );
}
