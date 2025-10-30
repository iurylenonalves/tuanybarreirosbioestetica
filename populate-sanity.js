/**
 * Script para popular o Sanity com dados de exemplo
 * 
 * Para executar:
 * 1. npm install @sanity/client
 * 2. node populate-sanity.js
 */

const { createClient } = require('@sanity/client');

// Configuração do cliente Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Você precisa criar um token de escrita
  apiVersion: '2024-01-01'
});

// Dados das categorias
const categories = [
  {
    _type: 'category',
    name: 'Produtos Faciais',
    slug: { current: 'produtos-faciais', _type: 'slug' },
    description: 'Cuidados especializados para o rosto',
    order: 1,
    active: true
  },
  {
    _type: 'category', 
    name: 'Produtos Corporais',
    slug: { current: 'produtos-corporais', _type: 'slug' },
    description: 'Tratamentos para o corpo',
    order: 2,
    active: true
  },
  {
    _type: 'category',
    name: 'Tratamentos Anti-idade', 
    slug: { current: 'tratamentos-anti-idade', _type: 'slug' },
    description: 'Combate ao envelhecimento',
    order: 3,
    active: true
  },
  {
    _type: 'category',
    name: 'Hidratação',
    slug: { current: 'hidratacao', _type: 'slug' },
    description: 'Produtos para hidratação profunda', 
    order: 4,
    active: true
  },
  {
    _type: 'category',
    name: 'Limpeza',
    slug: { current: 'limpeza', _type: 'slug' },
    description: 'Produtos de limpeza e purificação',
    order: 5,
    active: true
  }
];

async function populateCategories() {
  console.log('🏷️ Criando categorias...');
  
  try {
    const createdCategories = {};
    
    for (const category of categories) {
      const result = await client.create(category);
      createdCategories[category.slug.current] = result._id;
      console.log(`✅ Categoria criada: ${category.name} (ID: ${result._id})`);
    }
    
    return createdCategories;
  } catch (error) {
    console.error('❌ Erro ao criar categorias:', error);
    throw error;
  }
}

async function populateProducts(categoryIds) {
  console.log('📦 Criando produtos...');
  
  const products = [
    {
      _type: 'product',
      name: 'Sérum Vitamina C Premium',
      slug: { current: 'serum-vitamina-c-premium', _type: 'slug' },
      shortDescription: 'Sérum concentrado com vitamina C para iluminação e proteção antioxidante',
      price: 159.90,
      compareAtPrice: 199.90,
      brand: 'Tuany Beauty',
      sku: 'TB-VC001',
      stock: 25,
      featured: true,
      active: true,
      category: { _type: 'reference', _ref: categoryIds['produtos-faciais'] },
      tags: ['vitamina-c', 'antioxidante', 'clareamento', 'premium'],
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Nosso Sérum de Vitamina C Premium é formulado com 20% de vitamina C estabilizada, proporcionando máxima eficácia no combate aos radicais livres e clareamento de manchas.'
            }
          ]
        }
      ]
    },
    {
      _type: 'product',
      name: 'Creme Hidratante Facial Ácido Hialurônico',
      slug: { current: 'creme-hidratante-acido-hialuronico', _type: 'slug' },
      shortDescription: 'Hidratação intensa com ácido hialurônico de baixo peso molecular',
      price: 129.90,
      brand: 'Tuany Beauty',
      sku: 'TB-AH002',
      stock: 18,
      featured: true,
      active: true,
      category: { _type: 'reference', _ref: categoryIds['hidratacao'] },
      tags: ['acido-hialuronico', 'hidratacao', 'anti-idade']
    },
    {
      _type: 'product',
      name: 'Sabonete Facial Purificante',
      slug: { current: 'sabonete-facial-purificante', _type: 'slug' },
      shortDescription: 'Limpeza profunda sem ressecamento para todos os tipos de pele',
      price: 45.90,
      compareAtPrice: 59.90,
      brand: 'Tuany Beauty',
      sku: 'TB-SF003',
      stock: 50,
      active: true,
      category: { _type: 'reference', _ref: categoryIds['limpeza'] },
      tags: ['limpeza', 'purificante', 'espuma']
    }
  ];

  try {
    for (const product of products) {
      const result = await client.create(product);
      console.log(`✅ Produto criado: ${product.name} (ID: ${result._id})`);
    }
  } catch (error) {
    console.error('❌ Erro ao criar produtos:', error);
    throw error;
  }
}

async function main() {
  console.log('🚀 Iniciando população do Sanity...');
  
  try {
    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID não encontrado no .env.local');
    }
    
    if (!process.env.SANITY_API_TOKEN) {
      console.log('⚠️  SANITY_API_TOKEN não encontrado.');
      console.log('📝 Para criar um token:');
      console.log('1. Acesse https://sanity.io/manage');
      console.log('2. Selecione seu projeto');
      console.log('3. Vá em API > Tokens');
      console.log('4. Clique "Add API token"');
      console.log('5. Nome: "populate-script", Permissions: "Editor"');
      console.log('6. Adicione SANITY_API_TOKEN=seu_token no .env.local');
      return;
    }
    
    // Executar população
    const categoryIds = await populateCategories();
    await populateProducts(categoryIds);
    
    console.log('🎉 População concluída com sucesso!');
    console.log('📱 Acesse http://localhost:3000/produtos para ver o resultado');
    
  } catch (error) {
    console.error('💥 Erro durante a população:', error.message);
    process.exit(1);
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { populateCategories, populateProducts };