import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tuanybarreiros.com.br'

  // Static routes
  const routes = [
    '',
    '/sobre',
    '/servicos',
    '/produtos',
    '/blog',
    '/contato',
    '/agendar',
    '/politica-de-privacidade',
    '/termos-de-uso',
    '/politica-de-cancelamento',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Fetch products
  const products = await client.fetch(groq`*[_type == "product"]{ "slug": slug.current, _updatedAt }`)
  const productRoutes = products.map((product: any) => ({
    url: `${baseUrl}/produtos/${product.slug}`,
    lastModified: new Date(product._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Fetch posts
  const posts = await client.fetch(groq`*[_type == "post"]{ "slug": slug.current, _updatedAt }`)
  const postRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...routes, ...productRoutes, ...postRoutes]
}
