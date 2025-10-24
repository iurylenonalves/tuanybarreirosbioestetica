export function ValuesSection() {
  return (
    <section className="bg-brand-pink-light py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          
          <span className="text-sm font-semibold uppercase text-brand-dark-nude">
            Valores
          </span>

          {/* Usamos a tag 'blockquote' para a citação, que é semanticamente correta */}
          <blockquote className="mt-6">
            <p className="font-serif text-2xl md:text-3xl font-medium text-gray-800">
              "Nosso compromisso vai além da beleza. Acreditamos em transformar vidas por meio da precisão, empatia e cuidado autêntico."
            </p>
            {/* O 'footer' dentro do blockquote é o lugar semanticamente correto para a autoria */}
            <footer className="mt-8">
              {/* Usando a nova fonte de assinatura que adicionamos! */}
              <cite className="font-signature text-3xl text-brand-brown not-italic">
                Tuany Barreiros
              </cite>
            </footer>
          </blockquote>
          
        </div>
      </div>
    </section>
  );
}