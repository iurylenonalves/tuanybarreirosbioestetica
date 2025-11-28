import { TestimonialsCarousel, TestimonialSlide } from '@/components/ui/TestimonialsCarousel';

// Sample testimonial data
const testimonialsData: TestimonialSlide[] = [
  {
    quote: "Nunca imaginei que poderia me sentir tão confiante após um tratamento.",
    authorName: 'Maria Santos',
    authorRole: 'Cliente',
  },
  {
    quote: "O profissionalismo e o cuidado em cada detalhe são incomparáveis. Recomendo de olhos fechados!",
    authorName: 'Juliana Oliveira',
    authorRole: 'Cliente',
  },
  {
    quote: "Resultados que superaram todas as minhas expectativas. Uma verdadeira transformação.",
    authorName: 'Ana Costa',
    authorRole: 'Cliente',
  },
];

export function TestimonialSection() {
  return (
    <section className="bg-brand-off-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <TestimonialsCarousel slides={testimonialsData} />
      </div>
    </section>
  );
}