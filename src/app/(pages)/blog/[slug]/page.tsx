import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextBlock } from 'next-sanity'
import { clientWithToken } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import Image from 'next/image'

interface Post {
  _id: string
  title: string
  slug: string
  publishedAt: string
  _createdAt: string
  body?: PortableTextBlock[]
  mainImage?: {
    asset: {
      _ref: string
      _type: string
      url?: string
      alt?: string
    }
  }
  _rev?: string
  _draft?: boolean
}

interface NavigationPost {
  title: string
  slug: string
  publishedAt: string
}

export default async function PostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  console.log('=== DEBUG POST ===')
  console.log('Draft mode enabled:', isDraftMode)
  
  // Usar clientWithToken sempre para debug
  const sanityClient = clientWithToken
  console.log('Cliente usado: clientWithToken')
  console.log('Token disponível:', process.env.SANITY_API_READ_TOKEN ? 'SIM' : 'NÃO')
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Slug procurado:', `"${slug}"`)

  try {
    // Query com cache forçadamente desabilitado
    const allPostsQuery = `*[_type == "post"] {
      _id,
      _rev,
      _createdAt,
      title,
      "slug": slug.current,
      publishedAt,
      _draft
    } | order(_createdAt desc)`

    const allPosts = await sanityClient.fetch(
      allPostsQuery, 
      {}, 
      { 
        cache: 'no-store',
        next: { revalidate: 0 }
      }
    )
    
    console.log(`=== TODOS OS POSTS COM TOKEN (${allPosts.length}) ===`)
    
    allPosts.forEach((post: Post, index: number) => {
      const isMatch = post.slug === slug
      console.log(`${index + 1}. ${post.title}`)
      console.log(`   slug: "${post.slug}"`)
      console.log(`   ID: ${post._id}`)
      console.log(`   criado: ${post._createdAt}`)
      console.log(`   publicado: ${post.publishedAt ? 'Sim (' + post.publishedAt + ')' : 'Não'}`)
      console.log(`   _draft: ${post._draft}`)
      console.log(`   _rev: ${post._rev}`)
      console.log(`   match: ${isMatch ? '*** SIM ***' : 'não'}`)
      console.log('   ---')
    })

    // Buscar o post específico SEM filtro de publishedAt
    const postQuery = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      _rev,
      _createdAt,
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
      },
      _draft
    }`

    const post: Post = await sanityClient.fetch(
      postQuery, 
      { slug },
      { 
        cache: 'no-store',
        next: { revalidate: 0 }
      }
    )

    console.log('Post específico encontrado:', post ? 'Sim' : 'Não')
    if (post) {
      console.log('Detalhes do post:')
      console.log('- ID:', post._id)
      console.log('- Título:', post.title)
      console.log('- Slug:', post.slug)
      console.log('- Publicado em:', post.publishedAt || 'NÃO PUBLICADO')
      console.log('- _draft:', post._draft)
      console.log('- _rev:', post._rev)
      console.log('- mainImage:', post.mainImage ? 'Existe' : 'Não existe')
      
      // Debug da imagem principal
      if (post.mainImage) {
        console.log('=== DEBUG IMAGEM PRINCIPAL ===')
        console.log('asset completo:', JSON.stringify(post.mainImage.asset, null, 2))
        try {
          const imageUrl = urlFor(post.mainImage.asset).url()
          console.log('URL gerada pelo urlFor:', imageUrl)
        } catch (urlError) {
          console.error('Erro ao gerar URL com urlFor:', urlError)
        }
        console.log('=== FIM DEBUG IMAGEM ===')
      }
    }

    console.log('=== FIM DEBUG ===')

    if (!post) {
      console.log('POST NÃO ENCONTRADO - Redirecionando para 404')
      notFound()
    }

    // ✨ Buscar posts para navegação (anterior e próximo)
    const navigationQuery = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      publishedAt
    }`

    const allPublishedPosts: NavigationPost[] = await sanityClient.fetch(
      navigationQuery,
      {},
      { 
        cache: 'no-store',
        next: { revalidate: 0 }
      }
    )

    // Encontrar o índice do post atual
    const currentPostIndex = allPublishedPosts.findIndex(p => p.slug === slug)
    
    // Post anterior (mais recente) e próximo (mais antigo)
    const previousPost = currentPostIndex > 0 ? allPublishedPosts[currentPostIndex - 1] : null
    const nextPost = currentPostIndex < allPublishedPosts.length - 1 ? allPublishedPosts[currentPostIndex + 1] : null

    console.log('=== NAVEGAÇÃO ===')
    console.log('Post atual index:', currentPostIndex)
    console.log('Post anterior (mais recente):', previousPost?.title || 'Nenhum')
    console.log('Próximo post (mais antigo):', nextPost?.title || 'Nenhum')

    return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          {post.publishedAt ? (
            <time className="text-gray-600">
              {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
            </time>
          ) : (
            <div className="text-orange-600 font-semibold">
              📝 Post em Draft (não publicado)
            </div>
          )}
          {isDraftMode && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mt-4">
              🚧 Modo Preview Ativado
            </div>
          )}
        </header>

        {post.mainImage?.asset && (
          <div className="mb-8">
            <Image 
              src={urlFor(post.mainImage.asset).url()} 
              alt={post.mainImage.asset.alt || post.title}
              width={800}
              height={400}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {post.body && Array.isArray(post.body) && (
          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:mb-4 prose-p:leading-relaxed">
            <PortableText 
              value={post.body}
              components={{
                // Componentes para blocos
                block: {
                  // Parágrafos normais
                  normal: ({ children }) => (
                    <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
                  ),
                  // ✨ Texto justificado
                  justify: ({ children }) => (
                    <p className="mb-4 leading-relaxed text-gray-700 text-justify">{children}</p>
                  ),
                  // Headings
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mt-6 mb-4 text-gray-900">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">{children}</h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-900">{children}</h4>
                  ),
                  // Quotes
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-600">
                      {children}
                    </blockquote>
                  ),
                },
                
                // Componentes para tipos especiais
                types: {
                  image: ({ value }) => {
                    console.log('=== DEBUG IMAGEM PORTABLE TEXT ===')
                    console.log('value completo:', JSON.stringify(value, null, 2))
                    
                    if (!value?.asset) {
                      console.log('Imagem sem asset válido')
                      return null
                    }

                    try {
                      const imageUrl = urlFor(value.asset).url()
                      console.log('URL gerada pelo urlFor para PortableText:', imageUrl)
                      
                      return (
                        <figure className="my-8">
                          <Image 
                            src={imageUrl} 
                            alt={value.alt || 'Imagem do post'} 
                            width={800}
                            height={400}
                            className="rounded-lg w-full shadow-lg"
                          />
                          {value.alt && (
                            <figcaption className="text-center text-sm text-gray-600 mt-2">
                              {value.alt}
                            </figcaption>
                          )}
                        </figure>
                      )
                    } catch (error) {
                      console.error('Erro ao gerar URL da imagem PortableText:', error)
                      return (
                        <div className="my-8 p-4 bg-red-100 text-red-700 rounded">
                          Erro ao carregar imagem
                        </div>
                      )
                    }
                  }
                },
                
                // Componentes para marcações (formatação)
                marks: {
                  // Links
                  link: ({ children, value }) => (
                    <a 
                      href={value.href} 
                      className="text-blue-600 hover:underline font-medium"
                      target={value.blank ? '_blank' : undefined}
                      rel={value.blank ? 'noopener noreferrer' : undefined}
                    >
                      {children}
                    </a>
                  ),
                  // Texto em negrito
                  strong: ({ children }) => (
                    <strong className="font-bold text-gray-900">{children}</strong>
                  ),
                  // Texto em itálico
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                  // Código inline
                  code: ({ children }) => (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                      {children}
                    </code>
                  )
                },
                
                // Componentes para listas
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
                },
                
                // Itens de lista
                listItem: {
                  bullet: ({ children }) => (
                    <li className="ml-4">{children}</li>
                  ),
                  number: ({ children }) => (
                    <li className="ml-4">{children}</li>
                  )
                }
              }}
            />
          </div>
        )}

        {/* ✨ Navegação entre posts */}
        {(previousPost || nextPost) && (
          <nav className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              
              {/* Post Anterior (mais recente) */}
              <div className="flex-1">
                {previousPost ? (
                  <Link 
                    href={`/blog/${previousPost.slug}`}
                    className="group block p-4 rounded-lg border border-gray-200 hover:brand-dark-nude/50 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center text-sm text-gray-500 mb-2 group-hover:text-brand-brown">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Post Anterior
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-brand-brown transition-colors duration-200 line-clamp-2">
                      {previousPost.title}
                    </h3>
                    <time className="text-xs text-gray-500 mt-1 block">
                      {new Date(previousPost.publishedAt).toLocaleDateString('pt-BR')}
                    </time>
                  </Link>
                ) : (
                  <div className="p-4 rounded-lg border border-gray-100 text-gray-400">
                    <div className="flex items-center text-sm mb-2">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Nenhum post anterior
                    </div>
                  </div>
                )}
              </div>

              {/* Botão para voltar ao blog */}
              <div className="shrink-0">
                <Link 
                  href="/blog"
                  className="inline-flex items-center px-4 py-2 bg-brand-pink-light text-brand-text-button rounded-lg hover:bg-opacity-80 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m0 0l4-4m-4 4l4 4" />
                  </svg>
                  Ver todos os posts
                </Link>
              </div>

              {/* Próximo Post (mais antigo) */}
              <div className="flex-1">
                {nextPost ? (
                  <Link 
                    href={`/blog/${nextPost.slug}`}
                    className="group block p-4 rounded-lg border border-gray-200 hover:border-brand-dark-nude/50 hover:shadow-md transition-all duration-200 text-right"
                  >
                    <div className="flex items-center justify-end text-sm text-gray-500 mb-2">
                      Próximo Post
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-brand-brown transition-colors duration-200 line-clamp-2">
                      {nextPost.title}
                    </h3>
                    <time className="text-xs text-gray-500 mt-1 block">
                      {new Date(nextPost.publishedAt).toLocaleDateString('pt-BR')}
                    </time>
                  </Link>
                ) : (
                  <div className="p-4 rounded-lg border border-gray-100 text-gray-400 text-right">
                    <div className="flex items-center justify-end text-sm mb-2">
                      Nenhum próximo post
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </nav>
        )}

      </article>
    )

  } catch (error) {
    console.log('Erro ao carregar post:', error)
    notFound()
  }
}