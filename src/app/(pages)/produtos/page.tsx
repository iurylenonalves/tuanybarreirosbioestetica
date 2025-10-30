import { Metadata } from 'next';
import { getProducts, getCategories, getServicePackages } from '@/sanity/shop';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

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

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}

export default async function ShopPage() {
  try {
    // Buscar dados em paralelo
    const [products, servicePackages, categories] = await Promise.all([
      getProducts({ featured: true, limit: 8 }),
      getServicePackages({ featured: true, limit: 6 }),
      getCategories()
    ]);

    return (
      <div className="min-h-screen bg-brand-background">
        {/* Header */}
        <div className="bg-brand-pink-light border-b border-brand-dark-nude/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                Produtos & <span className="text-brand-text-button">Serviços</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Descubra nossa seleção exclusiva de produtos de beleza e tratamentos bioestéticos personalizados
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Categorias */}
          {categories.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Nossas Categorias
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/produtos/categoria/${category.slug.current}`}
                    className="group text-center"
                  >
                    <div className="bg-white rounded-full p-6 shadow-lg group-hover:shadow-xl transition-all duration-300 mb-3">
                      {category.image ? (
                        <Image
                          src={urlFor(category.image).width(80).height(80).url()}
                          alt={category.image.alt || category.name}
                          width={80}
                          height={80}
                          className="mx-auto rounded-full"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-linear-to-br from-brand-dark-nude to-brand-brown rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
                          {category.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-brand-text-button transition-colors">
                      {category.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Pacotes de Serviços em Destaque */}
          {servicePackages.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                  Pacotes de <span className="text-brand-text-button">Tratamentos</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Tratamentos completos e personalizados para realçar sua beleza natural
                </p>
              </div>
              
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
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
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

          {/* Produtos em Destaque */}
          {products.length > 0 && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                  Produtos em <span className="text-brand-text-button">Destaque</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Produtos selecionados especialmente para realçar sua beleza
                </p>
              </div>
              
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
                Não encontrou o que procurava?
              </h3>
              <p className="text-white mb-6 max-w-2xl mx-auto">
                Entre em contato conosco e descubra outros produtos e tratamentos personalizados para você
              </p>
              <Link
                href="/contato"
                className="inline-block bg-white text-brand-text-button px-8 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
              >
                Falar Conosco
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Produtos & Serviços
          </h1>
          <p className="text-gray-600 mb-8">
            Estamos organizando nossos produtos. Volte em breve!
          </p>
          <Link
            href="/"
            className="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    );
  }
}