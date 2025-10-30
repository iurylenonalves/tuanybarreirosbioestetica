import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServicePackageBySlug, getRelatedServicePackages, getReviews } from '@/sanity/shop';
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
  const servicePackage = await getServicePackageBySlug(slug);
  
  if (!servicePackage) {
    return {
      title: 'Pacote não encontrado',
    };
  }
  
  return {
    title: servicePackage.seoTitle || `${servicePackage.name} | Tuany Barreiros Bioestetica`,
    description: servicePackage.seoDescription || servicePackage.shortDescription || `Conheça ${servicePackage.name} - tratamento personalizado para sua beleza.`,
    openGraph: {
      title: servicePackage.seoTitle || servicePackage.name,
      description: servicePackage.seoDescription || servicePackage.shortDescription || '',
      images: [
        {
          url: urlFor(servicePackage.image).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: servicePackage.image.alt || servicePackage.name,
        },
      ],
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

export default async function ServicePackageDetailPage({ params }: Props) {
  try {
    const { slug } = await params;
    const servicePackage = await getServicePackageBySlug(slug);
    
    if (!servicePackage) {
      notFound();
    }

    // Buscar pacotes relacionados e avaliações
    const [relatedPackages, reviews] = await Promise.all([
      getRelatedServicePackages(servicePackage._id, servicePackage.category?._id, 3),
      getReviews({ servicePackageId: servicePackage._id, approved: true, limit: 5 })
    ]);

    // Calcular média das avaliações
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;

    return (
      <div className="min-h-screen bg-brand-background">
        {/* Header */}
        <div className="bg-brand-pink-light border-b border-brand-dark-nude/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-600 mb-6">
              <Link href="/" className="hover:text-brand-text-button">Início</Link>
              <span className="mx-2">/</span>
              <Link href="/produtos" className="hover:text-brand-text-button">Produtos</Link>
              <span className="mx-2">/</span>
              {servicePackage.category && (
                <>
                  <Link href={`/produtos/categoria/${servicePackage.category.slug.current}`} className="hover:text-brand-text-button">
                    {servicePackage.category.name}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              )}
              <span className="text-gray-900">{servicePackage.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Galeria de Imagens */}
            <div>
              <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden mb-4">
                <Image
                  src={urlFor(servicePackage.image).width(600).height(450).url()}
                  alt={servicePackage.image.alt || servicePackage.name}
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              
              {servicePackage.gallery && servicePackage.gallery.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {servicePackage.gallery.slice(0, 3).map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={urlFor(image).width(150).height(150).url()}
                        alt={image.alt || `${servicePackage.name} - imagem ${index + 2}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Informações do Pacote */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {servicePackage.category && (
                  <span className="text-sm text-brand-text-button bg-brand-pink-light px-2 py-1 rounded border border-brand-dark-nude/20">
                    {servicePackage.category.name}
                  </span>
                )}
                {servicePackage.popular && (
                  <span className="text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                    🔥 Mais Procurado
                  </span>
                )}
                {servicePackage.featured && (
                  <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                    ⭐ Destaque
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                {servicePackage.name}
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
                    {formatPrice(servicePackage.price)}
                  </span>
                  {servicePackage.originalPrice && (
                    <div className="flex flex-col">
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(servicePackage.originalPrice)}
                      </span>
                      <span className="text-sm text-green-600 font-semibold">
                        Economize {formatPrice(servicePackage.originalPrice - servicePackage.price)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Informações do Pacote */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                {servicePackage.sessions && (
                  <div>
                    <span className="text-gray-600">Sessões:</span>
                    <span className="ml-2 font-semibold">{servicePackage.sessions}</span>
                  </div>
                )}
                {servicePackage.duration && (
                  <div>
                    <span className="text-gray-600">Duração:</span>
                    <span className="ml-2 font-semibold">{servicePackage.duration}</span>
                  </div>
                )}
              </div>

              {/* Descrição Curta */}
              {servicePackage.shortDescription && (
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {servicePackage.shortDescription}
                </p>
              )}

              {/* Botões de Ação */}
              <div className="flex flex-col gap-3 mb-8">
                {servicePackage.bookingRequired ? (
                  <Link
                    href="/agendar"
                    className="w-full py-4 px-6 bg-brand-text-button hover:bg-brand-brown text-white rounded-lg font-semibold text-lg text-center transition-colors"
                  >
                    Agendar Consulta
                  </Link>
                ) : (
                  <AddToCartButton
                    item={{
                      id: servicePackage._id,
                      name: servicePackage.name,
                      price: servicePackage.price,
                      image: urlFor(servicePackage.image).width(100).height(100).url(),
                      type: 'service',
                      slug: servicePackage.slug.current
                    }}
                    className="w-full py-4 px-6 text-lg"
                  >
                    Contratar Pacote
                  </AddToCartButton>
                )}
                
                <Link
                  href="/contato"
                  className="w-full py-3 px-6 border-2 border-brand-text-button text-brand-text-button rounded-lg font-semibold text-center hover:bg-brand-pink-light transition-colors"
                >
                  Tirar Dúvidas
                </Link>
              </div>
            </div>
          </div>

          {/* Serviços Inclusos */}
          {servicePackage.includedServices && servicePackage.includedServices.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">O que está incluído</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {servicePackage.includedServices.map((service, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-brand-dark-nude/20">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{service.service}</h3>
                      <span className="text-sm bg-brand-pink-light text-brand-text-button px-2 py-1 rounded border border-brand-dark-nude/20">
                        {service.quantity}x
                      </span>
                    </div>
                    {service.description && (
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefícios */}
          {servicePackage.benefits && servicePackage.benefits.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefícios</h2>
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {servicePackage.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-pink-600 text-xl">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Público-Alvo */}
          {servicePackage.targetAudience && servicePackage.targetAudience.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Para quem é indicado</h2>
              <div className="bg-blue-50 rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {servicePackage.targetAudience.map((audience, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-blue-600 text-xl">👤</span>
                      <span className="text-gray-700">{audience}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contraindicações */}
          {servicePackage.contraindications && servicePackage.contraindications.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contraindicações</h2>
              <div className="bg-red-50 rounded-2xl p-8">
                <div className="grid gap-3">
                  {servicePackage.contraindications.map((contraindication, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-red-600 text-xl">⚠️</span>
                      <span className="text-gray-700">{contraindication}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Descrição Completa */}
          {servicePackage.description && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sobre o Tratamento</h2>
              <div className="prose prose-pink max-w-none bg-white rounded-2xl p-8 shadow-lg">
                <PortableText 
                  value={servicePackage.description}
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
                        <blockquote className="border-l-4 border-pink-500 pl-4 my-6 italic text-gray-600 bg-pink-50 py-2">
                          {children}
                        </blockquote>
                      )
                    },
                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-bold text-gray-900">{children}</strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic">{children}</em>
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

          {/* Galeria Antes/Depois */}
          {servicePackage.beforeAfterGallery && servicePackage.beforeAfterGallery.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resultados - Antes e Depois</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {servicePackage.beforeAfterGallery.map((comparison, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <h4 className="text-sm font-semibold text-gray-600 mb-2">ANTES</h4>
                        <div className="aspect-square rounded-lg overflow-hidden">
                          <Image
                            src={urlFor(comparison.before).width(200).height(200).url()}
                            alt="Antes do tratamento"
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <h4 className="text-sm font-semibold text-gray-600 mb-2">DEPOIS</h4>
                        <div className="aspect-square rounded-lg overflow-hidden">
                          <Image
                            src={urlFor(comparison.after).width(200).height(200).url()}
                            alt="Depois do tratamento"
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    {comparison.description && (
                      <p className="text-sm text-gray-600 text-center">{comparison.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Avaliações */}
          {reviews.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Avaliações dos Clientes</h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review._id} className="bg-white rounded-lg p-6 shadow-lg">
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

          {/* Pacotes Relacionados */}
          {relatedPackages.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Outros Tratamentos</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPackages.map((relatedPackage) => (
                  <Link
                    key={relatedPackage._id}
                    href={`/produtos/servicos/${relatedPackage.slug.current}`}
                    className="group"
                  >
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-[4/3]">
                        <Image
                          src={urlFor(relatedPackage.image).width(300).height(225).url()}
                          alt={relatedPackage.image.alt || relatedPackage.name}
                          width={300}
                          height={225}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                          {relatedPackage.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-pink-600">
                            {formatPrice(relatedPackage.price)}
                          </span>
                          {relatedPackage.popular && (
                            <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
                              Popular
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

          {/* Call to Action Final */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Pronta para transformar sua pele?
              </h3>
              <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
                Agende sua consulta e descubra como este tratamento pode realçar sua beleza natural
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/agendar"
                  className="inline-block bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
                >
                  Agendar Consulta
                </Link>
                <Link
                  href="/contato"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
                >
                  Tirar Dúvidas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar pacote de serviço:', error);
    notFound();
  }
}