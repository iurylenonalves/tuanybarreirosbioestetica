import Link from 'next/link';
import { BlogPostCard, BlogPostCardProps } from '@/components/cards/BlogPostCard';
import { Button } from '../ui/Button';

// Sample data for blog posts
const blogPostsData: BlogPostCardProps[] = [
  {
    category: 'Skincare',
    readingTime: '5 min de leitura',
    title: 'Hidratação no verão',
    excerpt: 'Proteja sua pele dos raios solares com nossa guia completa.',
    imageSrc: '/blog-1.jpg',
    linkHref: '/blog/hidratacao-no-verao',
  },
  {
    category: 'Tratamentos',
    readingTime: '3 min de leitura',
    title: 'Peeling químico',
    excerpt: 'Descubra como renovar sua pele com segurança e eficiência.',
    imageSrc: '/blog-2.jpg',
    linkHref: '/blog/peeling-quimico',
  },
  {
    category: 'Bem-estar',
    readingTime: '4 min de leitura',
    title: 'Rotina de autocuidado',
    excerpt: 'Pequenos gestos que fazem toda a diferença na sua autoestima.',
    imageSrc: '/blog-3.jpg',
    linkHref: '/blog/rotina-de-autocuidado',
  },
];

export function BlogSection() {
  return (    
    <section className="bg-brand-pink-light py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        
        {/* Tittle Block */}
        <span className="text-sm font-semibold uppercase text-brand-dark-nude">
          Blog
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 text-gray-800">
          Dicas de cuidados com a pele
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Conteúdo exclusivo para sua jornada de bem-estar.
        </p>

        {/* Posts Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPostsData.map((post) => (
            <BlogPostCard
              key={post.title}
              {...post}
            />
          ))}
        </div>

        {/* Button */}
        <div className="mt-12">
          <Link href="/blog">
            <Button variant="primary">Ver todos</Button>
          </Link>
        </div>

      </div>
    </section>
  );
}