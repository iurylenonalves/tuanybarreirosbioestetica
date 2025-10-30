/**
 * Dados de exemplo para popular o Sanity CMS com categorias, produtos e pacotes de serviços
 * 
 * Para usar este arquivo:
 * 1. Acesse o Sanity Studio em http://localhost:3000/studio
 * 2. Crie as categorias primeiro
 * 3. Depois crie os produtos e pacotes, referenciando as categorias criadas
 * 4. Por fim, crie algumas avaliações
 */

// ===== CATEGORIAS =====

export const sampleCategories = [
  {
    name: "Produtos Faciais",
    slug: "produtos-faciais",
    description: "Cuidados especializados para o rosto",
    order: 1
  },
  {
    name: "Produtos Corporais", 
    slug: "produtos-corporais",
    description: "Tratamentos para o corpo",
    order: 2
  },
  {
    name: "Tratamentos Anti-idade",
    slug: "tratamentos-anti-idade", 
    description: "Combate ao envelhecimento",
    order: 3
  },
  {
    name: "Hidratação",
    slug: "hidratacao",
    description: "Produtos para hidratação profunda",
    order: 4
  },
  {
    name: "Limpeza",
    slug: "limpeza",
    description: "Produtos de limpeza e purificação",
    order: 5
  }
];

// ===== PRODUTOS DE EXEMPLO =====

export const sampleProducts = [
  {
    name: "Sérum Vitamina C Premium",
    slug: "serum-vitamina-c-premium",
    shortDescription: "Sérum concentrado com vitamina C para iluminação e proteção antioxidante",
    price: 159.90,
    compareAtPrice: 199.90,
    brand: "Tuany Beauty",
    sku: "TB-VC001",
    stock: 25,
    featured: true,
    category: "produtos-faciais", // referência ao slug da categoria
    tags: ["vitamina-c", "antioxidante", "clareamento", "premium"],
    description: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Nosso Sérum de Vitamina C Premium é formulado com 20% de vitamina C estabilizada, proporcionando máxima eficácia no combate aos radicais livres e clareamento de manchas."
          }
        ]
      },
      {
        _type: "block", 
        style: "h3",
        children: [
          {
            _type: "span",
            text: "Benefícios"
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "• Clareamento de manchas e melasma\n• Proteção antioxidante\n• Estímulo à produção de colágeno\n• Iluminação natural da pele\n• Textura leve e rápida absorção"
          }
        ]
      }
    ]
  },
  {
    name: "Creme Hidratante Facial Ácido Hialurônico",
    slug: "creme-hidratante-acido-hialuronico",
    shortDescription: "Hidratação intensa com ácido hialurônico de baixo peso molecular",
    price: 129.90,
    brand: "Tuany Beauty",
    sku: "TB-AH002",
    stock: 18,
    featured: true,
    category: "hidratacao",
    tags: ["acido-hialuronico", "hidratacao", "anti-idade"]
  },
  {
    name: "Sabonete Facial Purificante",
    slug: "sabonete-facial-purificante",
    shortDescription: "Limpeza profunda sem ressecamento para todos os tipos de pele",
    price: 45.90,
    compareAtPrice: 59.90,
    brand: "Tuany Beauty", 
    sku: "TB-SF003",
    stock: 50,
    category: "limpeza",
    tags: ["limpeza", "purificante", "espuma"]
  },
  {
    name: "Óleo Corporal Nutritivo",
    slug: "oleo-corporal-nutritivo",
    shortDescription: "Nutrição e maciez para a pele do corpo com óleos vegetais premium",
    price: 89.90,
    brand: "Tuany Beauty",
    sku: "TB-OC004", 
    stock: 12,
    category: "produtos-corporais",
    tags: ["oleo-corporal", "nutricao", "maciez"]
  }
];

// ===== PACOTES DE SERVIÇOS =====

export const sampleServicePackages = [
  {
    name: "Protocolo Anti-idade Completo",
    slug: "protocolo-anti-idade-completo",
    shortDescription: "Tratamento completo para combater os sinais do envelhecimento",
    price: 899.90,
    originalPrice: 1299.90,
    duration: "3 meses",
    sessions: 12,
    popular: true,
    featured: true,
    bookingRequired: true,
    category: "tratamentos-anti-idade",
    includedServices: [
      {
        service: "Limpeza de Pele Profunda",
        quantity: 3,
        description: "Remoção de impurezas e renovação celular"
      },
      {
        service: "Peeling Químico",
        quantity: 3,
        description: "Renovação da camada superficial da pele"
      },
      {
        service: "Radiofrequência Facial",
        quantity: 6,
        description: "Estímulo ao colágeno e firmeza da pele"
      }
    ],
    benefits: [
      "Redução de rugas e linhas de expressão",
      "Melhora na firmeza e elasticidade",
      "Uniformização do tom da pele",
      "Hidratação profunda",
      "Resultado duradouro"
    ],
    targetAudience: [
      "Pessoas a partir dos 30 anos",
      "Sinais visíveis de envelhecimento",
      "Perda de firmeza da pele",
      "Rugas e linhas de expressão"
    ]
  },
  {
    name: "Pacote Hidratação Intensiva",
    slug: "pacote-hidratacao-intensiva", 
    shortDescription: "Restauração da barreira cutânea e hidratação profunda",
    price: 459.90,
    originalPrice: 599.90,
    duration: "1 mês",
    sessions: 4,
    featured: true,
    bookingRequired: true,
    category: "hidratacao",
    includedServices: [
      {
        service: "Hidratação Facial Profunda",
        quantity: 4,
        description: "Reposição de água e nutrientes essenciais"
      }
    ],
    benefits: [
      "Pele macia e sedosa",
      "Redução da descamação",
      "Melhora na textura da pele",
      "Proteção da barreira cutânea"
    ]
  },
  {
    name: "Detox Facial Premium",
    slug: "detox-facial-premium",
    shortDescription: "Purificação e renovação completa da pele facial",
    price: 299.90,
    duration: "Sessão única",
    sessions: 1,
    bookingRequired: true,
    category: "limpeza",
    includedServices: [
      {
        service: "Limpeza Profunda com Extração",
        quantity: 1,
        description: "Remoção de cravos e impurezas"
      },
      {
        service: "Máscara Purificante",
        quantity: 1,
        description: "Desintoxicação e fechamento dos poros"
      }
    ],
    benefits: [
      "Pele limpa e purificada",
      "Poros minimizados", 
      "Controle da oleosidade",
      "Aspecto renovado"
    ]
  }
];

// ===== AVALIAÇÕES DE EXEMPLO =====

export const sampleReviews = [
  {
    customerName: "Maria Silva",
    rating: 5,
    title: "Produto incrível!",
    comment: "O sérum de vitamina C realmente funciona. Em 2 semanas já notei diferença nas manchas do rosto. Super recomendo!",
    verified: true,
    approved: true,
    featured: true,
    // product: referência ao produto "serum-vitamina-c-premium"
  },
  {
    customerName: "Ana Costa",
    rating: 5,
    title: "Melhor tratamento que já fiz",
    comment: "O protocolo anti-idade superou minhas expectativas. A Tuany é muito profissional e os resultados são visíveis.",
    verified: true,
    approved: true,
    featured: true,
    // servicePackage: referência ao pacote "protocolo-anti-idade-completo"
  },
  {
    customerName: "Carla Mendes",
    rating: 4,
    title: "Ótima hidratação",
    comment: "O creme com ácido hialurônico deixa a pele muito macia. Única observação é que demora um pouco para absorver.",
    verified: true,
    approved: true,
    // product: referência ao produto "creme-hidratante-acido-hialuronico"
  }
];

// ===== INSTRUÇÕES DE USO =====

export const instructions = `
Para popular o Sanity Studio com estes dados:

1. CATEGORIAS (criar primeiro):
   - Acesse "Loja > Categorias" no Studio
   - Crie cada categoria usando os dados de sampleCategories
   - Anote os IDs gerados para usar nos produtos

2. PRODUTOS:
   - Acesse "Loja > Produtos" no Studio  
   - Crie cada produto usando os dados de sampleProducts
   - Selecione a categoria correspondente ao criar
   - Adicione pelo menos uma imagem para cada produto

3. PACOTES DE SERVIÇOS:
   - Acesse "Loja > Pacotes de Serviços" no Studio
   - Crie cada pacote usando os dados de sampleServicePackages
   - Adicione uma imagem principal para cada pacote

4. AVALIAÇÕES:
   - Acesse "Loja > Avaliações" no Studio
   - Crie as avaliações e conecte aos produtos/pacotes correspondentes

5. TESTAR:
   - Visite http://localhost:3000/produtos para ver o resultado
   - Teste a navegação entre categorias e produtos
   - Verifique se as avaliações aparecem nas páginas de detalhes
`;

console.log('Dados de exemplo criados!');
console.log('Acesse o arquivo sample-data.ts para ver todas as informações.');