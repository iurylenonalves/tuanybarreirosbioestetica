import { ImageCarousel, Slide } from '@/components/ui/ImageCarousel';
import { Button } from '@/components/ui/Button';
import Link from 'next/dist/client/link';

export function HeroSection() {
  // Dados de exemplo para o carrossel. Coloque suas imagens na pasta /public
  const carouselSlides: Slide[] = [
    {
      src: '/hero-image.jpg', // << Troque pela sua imagem
      alt: 'Descrição da imagem 1',
      title: 'Tratamentos Faciais Personalizados',
      description: 'Cuidado profundo para uma pele radiante e saudável.',
    },
    {
      src: '/service-limpeza.jpg', // << Troque pela sua imagem
      alt: 'Descrição da imagem 2',
      title: 'Tecnologia e Bem-estar',
      description: 'Utilizamos equipamentos de ponta para resultados incríveis.',
    },
    {
      src: '/service-nutricao.jpg', // << Troque pela sua imagem
      alt: 'Descrição da imagem 3',
      title: 'Cuidado que Transforma',
      description: 'Uma jornada única de autoconfiança e beleza.',
    },
  ];

  return (
    <section className="bg-brand-pink-light py-16 md:py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Coluna de Texto - Atualizada com o novo texto */}
        <div className="text-center md:text-left">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
                Bioestética que valoriza sua beleza natural
            </h1>
            <p className="mt-4 text-lg text-gray-600">
                Transforme sua pele com cuidados personalizados. Cada tratamento
                é uma jornada única de autoconfiança e bem-estar.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link href="/agendar">
                <Button variant="primary">Agendar</Button>
              </Link>
              <Link href="/sobre">
                <Button variant="secondary">Saiba mais</Button>
              </Link>
            </div>
        </div>
        
        {/* Coluna da Direita - AGORA COM O CARROSSEL */}
        <div>
          <ImageCarousel slides={carouselSlides} />
        </div>

      </div>
    </section>
  );
}