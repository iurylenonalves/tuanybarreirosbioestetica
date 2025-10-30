import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts, getReviews } from '@/sanity/shop';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { AddToCartButton } from '@/components/ui/AddToCartButton';

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
      images: product.images.length > 0 ? [
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

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}

export default async function ProductDetailPage({ params }: Props) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    
    if (!product) {
      notFound();
    }

    // Buscar produtos relacionados e avaliações
    const [relatedProducts, reviews] = await Promise.all([
      getRelatedProducts(product._id, product.category._id, 4),
      getReviews({ productId: product._id, approved: true, limit: 5 })
    ]);

    // Calcular média das avaliações
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;

    return (
      <div className="min-h-screen bg-brand-background">
        {/* Header */}
        <div className="bg-brand-pink-light border-b border-brand-dark-nude/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-600">
              <Link href="/" className="hover:text-brand-text-button">Início</Link>
              <span className="mx-2">/</span>
              <Link href="/produtos" className="hover:text-brand-text-button">Produtos</Link>
              <span className="mx-2">/</span>
              <Link href={`/produtos/categoria/${product.category.slug.current}`} className="hover:text-brand-text-button">
                {product.category.name}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Galeria de Imagens */}
            <div>
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
                <Image
                  src={urlFor(product.images[0]).width(600).height(600).url()}
                  alt={product.images[0].alt || product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={urlFor(image).width(150).height(150).url()}
                        alt={image.alt || `${product.name} - imagem ${index + 2}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Informações do Produto */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-brand-text-button bg-brand-pink-light px-2 py-1 rounded border border-brand-dark-nude/20">
                  {product.category.name}
                </span>
                {product.featured && (
                  <span className="text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                    ⭐ Destaque
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Avaliações */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= averageRating ? 'text-yellow-400' : 'text-gray-300'}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'})
                  </span>
                </div>
              )}

              {/* Preço */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-brand-text-button">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <div className="flex flex-col">
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                      <span className="text-sm text-green-600 font-semibold">
                        Economize {formatPrice(product.compareAtPrice - product.price)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Informações adicionais */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                {product.brand && (
                  <div>
                    <span className="text-gray-600">Marca:</span>
                    <span className="ml-2 font-semibold">{product.brand}</span>
                  </div>
                )}
                {product.sku && (
                  <div>
                    <span className="text-gray-600">SKU:</span>
                    <span className="ml-2 font-mono text-xs">{product.sku}</span>
                  </div>
                )}
                {product.stock !== undefined && (
                  <div>
                    <span className="text-gray-600">Estoque:</span>
                    <span className={`ml-2 font-semibold ${
                      product.stock === 0 ? 'text-red-600' : 
                      product.stock < 5 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {product.stock === 0 ? 'Esgotado' : `${product.stock} unidades`}
                    </span>
                  </div>
                )}
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col gap-3 mb-8">
                {product.stock === 0 ? (
                  <button
                    disabled
                    className="w-full py-4 px-6 rounded-lg font-semibold text-lg bg-gray-300 text-gray-500 cursor-not-allowed"
                  >
                    Produto Esgotado
                  </button>
                ) : (
                  <AddToCartButton
                    item={{
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: urlFor(product.images[0]).width(100).height(100).url(),
                      type: 'product',
                      slug: product.slug.current,
                      stock: product.stock
                    }}
                    className="w-full py-4 px-6 text-lg"
                  />
                )}
                
                <Link
                  href="/contato"
                  className="w-full py-3 px-6 border-2 border-brand-text-button text-brand-text-button rounded-lg font-semibold text-center hover:bg-brand-pink-light transition-colors"
                >
                  Tirar Dúvidas
                </Link>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-brand-off-white text-brand-text-button px-2 py-1 rounded border border-brand-dark-nude/20">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Descrição do Produto */}
          {product.description && (
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Descrição do Produto</h2>
              <div className="prose max-w-none">
                <PortableText 
                  value={product.description}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{children}</h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">{children}</h4>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-brand-text-button pl-4 my-6 italic text-gray-600 bg-brand-pink-light py-2">
                          {children}
                        </blockquote>
                      ),
                      justified: ({ children }) => (
                        <p className="mb-4 text-gray-700 leading-relaxed text-justify">{children}</p>
                      )
                    },
                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-bold text-gray-900">{children}</strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic">{children}</em>
                      ),
                      link: ({ children, value }) => (
                        <a 
                          href={value.href} 
                          className="text-brand-text-button hover:underline font-medium"
                          target={value.blank ? '_blank' : undefined}
                          rel={value.blank ? 'noopener noreferrer' : undefined}
                        >
                          {children}
                        </a>
                      )
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="list-disc list-inside my-4 space-y-2 text-gray-700">
                          {children}
                        </ul>
                      ),
                      number: ({ children }) => (
                        <ol className="list-decimal list-inside my-4 space-y-2 text-gray-700">
                          {children}
                        </ol>
                      )
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Avaliações */}
          {reviews.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Avaliações dos Clientes</h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review._id} className="bg-brand-off-white rounded-lg p-6 border border-brand-dark-nude/20">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          ✓ Compra Verificada
                        </span>
                      )}
                    </div>
                    
                    {review.title && (
                      <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                    )}
                    
                    {review.comment && (
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                    )}
                    
                    <span className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Produtos Relacionados */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">Produtos Relacionados</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct._id}
                    href={`/produtos/${relatedProduct.slug.current}`}
                    className="group"
                  >
                    <div className="bg-white border border-brand-dark-nude/20 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square">
                        <Image
                          src={urlFor(relatedProduct.images[0]).width(250).height(250).url()}
                          alt={relatedProduct.images[0].alt || relatedProduct.name}
                          width={250}
                          height={250}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-text-button transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-brand-text-button">
                            {formatPrice(relatedProduct.price)}
                          </span>
                          {relatedProduct.compareAtPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(relatedProduct.compareAtPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar produto:', error);
    notFound();
  }
}