import { ShoppingBag } from 'lucide-react';

export function ComingSoon() {
  return (
    <section className="bg-brand-background py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <ShoppingBag size={48} className="mx-auto text-brand-brown" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-6 text-gray-800">
            Em Breve
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Nossa loja online está sendo preparada com muito carinho. Volte em breve para conferir os produtos e serviços exclusivos que selecionamos para você.
          </p>
        </div>
      </div>
    </section>
  );
}