import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts, getReviews } from '@/sanity/shop';
import { urlFor } from '@/sanity/lib/image';
import { ProductHeader } from '@/components/product/ProductHeader';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductActions } from '@/components/product/ProductActions';
import { ProductDescription } from '@/components/product/ProductDescription';
import { ReviewsList } from '@/components/shared/ReviewsList';
import { RelatedProducts } from '@/components/product/RelatedProducts';

export const revalidate = 60; // ISR

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Produto não encontrado',
    };
  }
  
  return {
    title: product.seoTitle || `${product.name} | Tuany Barreiros Bioestetica`,
    description: product.seoDescription || product.shortDescription || `Conheça ${product.name} - produto de qualidade para sua beleza.`,
    openGraph: {
      title: product.seoTitle || product.name,
      description: product.seoDescription || product.shortDescription || '',
      images: (product.images.length > 0 && product.images[0]?.asset) ? [
        {
          url: urlFor(product.images[0]).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: product.images[0].alt || product.name,
        },
      ] : [],
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    
    if (!product) {
      notFound();
    }

    // Fetch related products and reviews
    const [relatedProducts, reviews] = await Promise.all([
      getRelatedProducts(product._id, product.category._id, 4),
      getReviews({ productId: product._id, approved: true, limit: 5 })
    ]);

    return (
      <div className="min-h-screen bg-brand-background">
        <ProductHeader product={product} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <ProductGallery images={product.images} name={product.name} />
            <div>
              <ProductInfo product={product} reviews={reviews} />
              <ProductActions product={product} />
            </div>
          </div>
          
          <ProductDescription description={product.description} />
          <ReviewsList reviews={reviews} />
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar produto:', error);
    notFound();
  }
}