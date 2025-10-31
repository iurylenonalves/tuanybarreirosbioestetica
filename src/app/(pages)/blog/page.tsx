import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { ChevronRight } from 'lucide-react'
import { devLog, errorLog } from '@/lib/logger'

interface Post {
  _id: string
  title: string
  slug: string
  publishedAt: string
  body?: unknown
  mainImage?: {
    asset: {
      _ref: string
      _type: string
      url?: string
      alt?: string
    }
  }
}

async function getPosts() {
  try {
    const query = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      body,
      mainImage {
        asset-> {
          _id,
          _ref,
          _type,
          url,
          alt
        }
      }
    }`
    
    // ✨ Forçar dados frescos do Sanity
    const posts = await client.fetch<Post[]>(
      query,
      {},
      {
        cache: 'no-store', // Não usar cache do Next.js
        next: { 
          revalidate: 60, // Revalidar a cada 60 segundos
          tags: ['posts'] // Tag para revalidação on-demand
        }
      }
    )
    
    devLog(`Posts carregados: ${posts.length}`)
    return posts
  } catch (error) {
    errorLog('Erro ao buscar posts', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-brand-pink-light py-16 md:py-20">
      <div className="container mx-auto px-4">
        
        {/* Header da página */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase text-brand-dark-nude">
            Blog
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-2 text-gray-800">
            Dicas de cuidados com a pele
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Conteúdo exclusivo para sua jornada de bem-estar e beleza.
          </p>
        </div>

        {/* Verificar se há posts */}
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Em breve, novos conteúdos!
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Estamos preparando conteúdos exclusivos sobre cuidados com a pele e bem-estar para você.
            </p>
          </div>
        ) : (
          /* Grid de Posts */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post._id} 
                href={`/blog/${post.slug}`} 
                className="block group"
              >
                <div className="bg-brand-off-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                  
                  {/* Imagem do Post */}
                  <div className="relative w-full h-56 bg-gray-200">
                    {post.mainImage?.asset ? (
                      <Image
                        src={urlFor(post.mainImage.asset).url()}
                        alt={post.mainImage.asset.alt || post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      /* Placeholder quando não há imagem */
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-brand-pink-light to-brand-dark-nude/20">
                        <div className="text-4xl text-brand-dark-nude/60">✨</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Conteúdo do Card */}
                  <div className="p-6 flex flex-col grow">
                    
                    {/* Data de publicação */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="font-semibold">
                        {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    {/* Título */}
                    <h2 className="font-serif text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-brand-brown transition-colors">
                      {post.title}
                    </h2>
                    
                    {/* Link "Leia mais" */}
                    <div className="flex items-center gap-1 font-semibold text-gray-800 group-hover:text-brand-brown transition-colors mt-auto">
                      Leia mais
                      <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Botão para voltar à home */}
        <div className="text-center mt-16">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-brand-brown text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar ao início
          </Link>
        </div>

      </div>
    </div>
  )
}

// ✨ Configuração de revalidação
export const revalidate = 60 // Revalidar a cada 60 segundos

// Metadata da página
export const metadata = {
  title: 'Blog - Tuany Barreiros Bioestética',
  description: 'Dicas, novidades e tudo sobre o universo da bioestética e cuidados com a pele',
}