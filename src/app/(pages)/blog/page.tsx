import { client } from '@/sanity/lib/client'; // Usar apenas cliente público
import { BlogPostCard } from '@/components/cards/BlogPostCard';
import { urlFor } from '@/sanity/lib/image';

// Interface para os dados dos posts
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  body: any;
  excerpt: string;
}

// Função para buscar os posts PUBLICADOS
async function getPosts() {
  try {
    const query = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      "excerpt": array::join(string::split((pt::text(body)), "")[0..150], "") + "..."
    }`;
    
    const posts = await client.fetch<Post[]>(query);
    return posts;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="bg-brand-background py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        {/* Bloco de Título */}
        <span className="text-sm font-semibold uppercase text-brand-dark-nude">
          Blog
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mt-2 text-gray-800">
          Nosso Blog
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Dicas, novidades e tudo sobre o universo da bioestética.
        </p>

        {/* Verificar se há posts */}
        {posts.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-gray-500">Nenhum post publicado ainda.</p>
            <p className="text-sm text-gray-400 mt-2">
              Publique alguns posts no Sanity Studio para vê-los aqui.
            </p>
          </div>
        ) : (
          /* Grid de Posts */
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {posts.map((post) => (
              <BlogPostCard
                key={post._id}
                title={post.title}
                imageSrc={post.mainImage ? urlFor(post.mainImage).url() : '/placeholder-blog.jpg'}
                excerpt={post.excerpt}
                linkHref={`/blog/${post.slug.current}`}
                category="Bioestética"
                readingTime="5 min de leitura"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Metadata da página
export const metadata = {
  title: 'Blog',
  description: 'Dicas, novidades e tudo sobre o universo da bioestética',
};