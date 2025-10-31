'use client';

import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';

interface Product {
  name: string;
  category: {
    name: string;
    slug: { current: string };
  };
}

interface ProductHeaderProps {
  product: Product;
}

export function ProductHeader({ product }: ProductHeaderProps) {
  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Produtos', href: '/produtos' },
    { 
      label: product.category.name, 
      href: `/produtos?category=${product.category.slug.current}` 
    },
    { label: product.name }
  ];

  return <PageBreadcrumb items={breadcrumbItems} />;
}