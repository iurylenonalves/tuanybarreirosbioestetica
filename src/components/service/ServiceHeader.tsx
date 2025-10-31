'use client';

import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';

interface ServicePackage {
  name: string;
  category?: {
    name: string;
    slug: { current: string };
  };
}

interface ServiceHeaderProps {
  servicePackage: ServicePackage;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function ServiceHeader({ servicePackage }: ServiceHeaderProps) {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Início', href: '/' },
    { label: 'Produtos', href: '/produtos' },
  ];

  if (servicePackage.category) {
    breadcrumbItems.push({
      label: servicePackage.category.name,
      href: `/produtos?category=${servicePackage.category.slug.current}`
    });
  }

  breadcrumbItems.push({ label: servicePackage.name });

  return <PageBreadcrumb items={breadcrumbItems} />;
}