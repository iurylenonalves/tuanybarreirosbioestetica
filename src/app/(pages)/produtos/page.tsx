import { Metadata } from 'next';
import { getProducts, getCategories, getServicePackages } from '@/sanity/shop';
import { ProductsPageClient } from '@/components/pages/ProductsPageClient';

export const revalidate = 60; // ISR - revalida a cada 60 segundos

export const metadata: Metadata = {
  title: 'Produtos e Serviços | Tuany Barreiros Bioestetica',
  description: 'Descubra nossos produtos de beleza e pacotes de tratamentos bioestéticos exclusivos.',
  openGraph: {
    title: 'Produtos e Serviços | Tuany Barreiros Bioestetica',
    description: 'Descubra nossos produtos de beleza e pacotes de tratamentos bioestéticos exclusivos.',
    type: 'website',
  },
};

export default async function ShopPage() {
  try {
    // Buscar dados em paralelo
    const [products, servicePackages, categories] = await Promise.all([
      getProducts(),
      getServicePackages(),
      getCategories()
    ]);

    return (
      <ProductsPageClient 
        products={products}
        servicePackages={servicePackages}
        categories={categories}
      />
    );
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    
    return (
      <ProductsPageClient 
        products={[]}
        servicePackages={[]}
        categories={[]}
      />
    );
  }
}