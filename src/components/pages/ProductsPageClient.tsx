'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ProductCard } from '@/components/cards/ProductCard';
import { CategoryFilter } from '@/components/ui/CategoryFilter';

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  images: Array<{ alt?: string }>;
  price: number;
  compareAtPrice?: number;
  shortDescription?: string;
  featured?: boolean;
  stock?: number;
  category: {
    _id: string;
    name: string;
    slug: { current: string };
  };
}

interface ServicePackage {
  _id: string;
  name: string;
  slug: { current: string };
  image: { alt?: string };
  price: number;
  originalPrice?: number;
  shortDescription?: string;
  popular?: boolean;
  sessions?: number;
  bookingRequired?: boolean;
  category?: {
    _id: string;
    name: string;
    slug: { current: string };
  };
}

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
}

interface ProductsPageClientProps {
  products: Product[];
  servicePackages: ServicePackage[];
  categories: Category[];
}

export function ProductsPageClient({ products, servicePackages, categories }: ProductsPageClientProps) {
  const searchParams = useSearchParams();
  
  // Ler categoria da URL imediatamente no estado inicial
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    return searchParams.get('category') || 'all';
  });

  // Atualizar categoria quando a URL mudar
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    setSelectedCategory(categoryFromUrl || 'all');
  }, [searchParams]);

  // Combinar produtos e serviços em um único array
  const allItems = useMemo(() => {
    const productsWithType = products.map(product => ({ ...product, type: 'product' as const }));
    const servicesWithType = servicePackages.map(service => ({ ...service, type: 'servicePackage' as const }));
    return [...productsWithType, ...servicesWithType];
  }, [products, servicePackages]);

  // Filtrar itens baseado na categoria selecionada
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') {
      return allItems;
    }
    return allItems.filter(item => {
      const categorySlug = item.category?.slug.current;
      return categorySlug === selectedCategory;
    });
  }, [allItems, selectedCategory]);

  if (allItems.length === 0) {
    return (
      <div className="min-h-screen bg-brand-background flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🛍️</div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Em breve!
          </h2>
          <p className="text-gray-600 mb-8">
            Estamos organizando nossos produtos e serviços. Volte em breve!
          </p>
          <Link
            href="/"
            className="inline-block bg-brand-text-button text-white px-6 py-3 rounded-lg hover:bg-brand-brown transition-colors"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-background">
      {/* Hero minimalista */}
      <div className="bg-brand-pink-light border-b border-brand-dark-nude/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Nossa Loja
            </h1>
            <p className="text-xl text-gray-600">
              Descubra produtos de qualidade e tratamentos personalizados para realçar sua beleza natural
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filtro de categorias */}
        {categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}

        {/* Grid unificado de produtos e serviços */}
        {filteredItems.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {filteredItems.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum item encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Não encontramos produtos ou serviços nesta categoria.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="bg-brand-text-button text-white px-6 py-3 rounded-lg hover:bg-brand-brown transition-colors"
            >
              Ver Todos os Itens
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-brand-brown rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Não encontrou o que procurava?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Entre em contato conosco e descubra outros produtos e tratamentos personalizados para você
            </p>
            <Link
              href="/contato"
              className="inline-block bg-white text-brand-text-button px-8 py-3 rounded-lg font-semibold hover:bg-brand-pink-light transition-colors"
            >
              Falar Conosco
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}