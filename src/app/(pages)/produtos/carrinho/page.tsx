import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Carrinho de Compras | Tuany Barreiros Bioestetica',
  description: 'Finalize sua compra dos melhores produtos de beleza e tratamentos.',
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🛒</div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Carrinho de Compras
            </h1>
            
            <p className="text-gray-600 mb-8 text-lg">
              Estamos preparando um sistema de compras completo para você! 
              <br />
              Em breve você poderá finalizar suas compras diretamente aqui.
            </p>
            
            <div className="bg-pink-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-pink-800 mb-3">
                🎉 Enquanto isso, você pode:
              </h3>
              <ul className="text-left text-pink-700 space-y-2">
                <li>✨ Navegar pelos nossos produtos</li>
                <li>📱 Entrar em contato via WhatsApp</li>
                <li>📞 Ligar diretamente para fazer seu pedido</li>
                <li>📧 Enviar um e-mail com sua lista de desejos</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/produtos"
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Ver Produtos
              </Link>
              
              <Link
                href="/contato"
                className="bg-white border-2 border-pink-600 text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Falar Conosco
              </Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                💡 <strong>Dica:</strong> Salve os produtos que você gostou e entre em contato conosco. 
                Teremos o maior prazer em ajudar com seu pedido!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}