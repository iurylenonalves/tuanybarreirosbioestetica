import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProducts, getServicePackages, getCategories } from '@/sanity/shop';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 60; // ISR

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find(cat => cat.slug.current === slug);
  
  if (!category) {
    return {
      title: 'Categoria não encontrada',
    };
  }
  
  return {
    title: `${category.name} | Tuany Barreiros Bioestetica`,
    description: category.seoDescription || category.description || `Descubra nossos produtos e serviços de ${category.name.toLowerCase()}`,
    openGraph: {
      title: `${category.name} | Tuany Barreiros Bioestetica`,
      description: category.seoDescription || category.description || '',
      images: category.image ? [
        {
          url: urlFor(category.image).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: category.image.alt || category.name,
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

export default async function CategoryPage({ params }: Props) {
  try {
    const { slug } = await params;
    
    // Buscar dados em paralelo
    const [categories, products, servicePackages] = await Promise.all([
      getCategories(),
      getProducts({ category: slug, limit: 50 }),
      getServicePackages({ category: slug, limit: 20 })
    ]);
    
    const category = categories.find(cat => cat.slug.current === slug);
    
    if (!category) {
      notFound();
    }

    const hasProducts = products.length > 0;
    const hasServicePackages = servicePackages.length > 0;
    
    if (!hasProducts && !hasServicePackages) {
      return (
        <div className="min-h-screen bg-brand-background">
          {/* Header */}
          <div className="bg-brand-pink-light border-b border-brand-dark-nude/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Breadcrumb */}
              <nav className="flex text-sm text-gray-600 mb-6">
                <Link href="/" className="hover:text-brand-text-button">Início</Link>
                <span className="mx-2">/</span>
                <Link href="/produtos" className="hover:text-brand-text-button">Produtos</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{category.name}</span>
              </nav>
              
              <div className="text-center">
                {category.image && (
                  <div className="w-24 h-24 mx-auto mb-6">
                    <Image
                      src={urlFor(category.image).width(96).height(96).url()}
                      alt={category.image.alt || category.name}
                      width={96}
                      height={96}
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                  {category.name}
                </h1>
                
                {category.description && (
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
                <div className="text-6xl mb-6">📦</div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Em breve!
                </h2>
                
                <p className="text-gray-600 mb-8 text-lg">
                  Estamos preparando produtos incríveis para esta categoria. 
                  <br />
                  Volte em breve para conferir as novidades!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/produtos"
                    className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Ver Todos os Produtos
                  </Link>
                  
                  <Link
                    href="/contato"
                    className="bg-white border-2 border-pink-600 text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Falar Conosco
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-brand-background">
        {/* Header */}
        <div className="bg-brand-pink-light border-b border-brand-dark-nude/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-600 mb-6">
              <Link href="/" className="hover:text-brand-text-button">Início</Link>
              <span className="mx-2">/</span>
              <Link href="/produtos" className="hover:text-brand-text-button">Produtos</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{category.name}</span>
            </nav>
            
            <div className="text-center">
              {category.image && (
                <div className="w-24 h-24 mx-auto mb-6">
                  <Image
                    src={urlFor(category.image).width(96).height(96).url()}
                    alt={category.image.alt || category.name}
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                {category.name}
              </h1>
              
              {category.description && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {category.description}
                </p>
              )}
              
              <div className="flex justify-center gap-4 mt-6 text-sm text-gray-500">
                {hasProducts && (
                  <span>{products.length} {products.length === 1 ? 'produto' : 'produtos'}</span>
                )}
                {hasServicePackages && (
                  <span>{servicePackages.length} {servicePackages.length === 1 ? 'pacote' : 'pacotes'}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Pacotes de Serviços */}
          {hasServicePackages && (
            <div className="mb-16">
              <h2 className="text-3xl font-serif font-bold text-gray-900 text-center mb-12">
                Pacotes de <span className="text-brand-text-button">Tratamentos</span>
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicePackages.map((servicePackage) => (
                  <Link
                    key={servicePackage._id}
                    href={`/produtos/servicos/${servicePackage.slug.current}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="relative h-64">
                        <Image
                          src={urlFor(servicePackage.image).width(400).height(300).url()}
                          alt={servicePackage.image.alt || servicePackage.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {servicePackage.popular && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-brand-text-button text-white px-3 py-1 rounded-full text-sm font-semibold">
                              Mais Procurado
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-text-button transition-colors">
                          {servicePackage.name}
                        </h3>
                        
                        {servicePackage.shortDescription && (
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {servicePackage.shortDescription}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-2xl font-bold text-brand-text-button">
                              {formatPrice(servicePackage.price)}
                            </span>
                            {servicePackage.originalPrice && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                {formatPrice(servicePackage.originalPrice)}
                              </span>
                            )}
                          </div>
                          {servicePackage.sessions && (
                            <span className="text-sm text-gray-500 bg-brand-off-white px-2 py-1 rounded border border-brand-dark-nude/20">
                              {servicePackage.sessions} sessões
                            </span>
                          )}
                        </div>
                        
                        <div className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors text-center ${
                          servicePackage.bookingRequired
                            ? 'bg-brand-text-button group-hover:bg-brand-brown text-white'
                            : 'bg-brand-off-white group-hover:bg-brand-pink-light text-brand-text-button border border-brand-dark-nude/20'
                        }`}>
                          {servicePackage.bookingRequired ? 'Agendar Consulta' : 'Ver Detalhes'}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Produtos */}
          {hasProducts && (
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 text-center mb-12">
                {hasServicePackages ? 'Produtos' : `Produtos de ${category.name}`}
              </h2>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    href={`/produtos/${product.slug.current}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="relative h-48">
                        <Image
                          src={urlFor(product.images[0]).width(300).height(200).url()}
                          alt={product.images[0].alt || product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.featured && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-brand-text-button text-white px-2 py-1 rounded-full text-xs font-semibold">
                              Destaque
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-brand-text-button transition-colors">
                          {product.name}
                        </h3>
                        
                        {product.shortDescription && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.shortDescription}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-brand-text-button">
                              {formatPrice(product.price)}
                            </span>
                            {product.compareAtPrice && (
                              <span className="text-sm text-gray-500 line-through ml-1">
                                {formatPrice(product.compareAtPrice)}
                              </span>
                            )}
                          </div>
                          
                          {product.stock !== undefined && product.stock < 5 && (
                            <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                              {product.stock === 0 ? 'Esgotado' : `${product.stock} restantes`}
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

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-brand-brown rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ficou interessada?
              </h3>
              <p className="text-white mb-6 max-w-2xl mx-auto">
                Entre em contato conosco para saber mais sobre nossos produtos e tratamentos personalizados
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contato"
                  className="inline-block bg-white text-brand-text-button px-8 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
                >
                  Falar Conosco
                </Link>
                <Link
                  href="/agendar"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
                >
                  Agendar Consulta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar categoria:', error);
    notFound();
  }
}