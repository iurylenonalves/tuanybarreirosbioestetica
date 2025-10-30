import { defineField, defineType } from 'sanity';
import { ShoppingCart } from 'lucide-react';

export const productType = defineType({
  name: 'product',
  title: 'Produtos',
  type: 'document',
  icon: ShoppingCart,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Produto',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'blockContent'
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrição Curta',
      type: 'text',
      rows: 3,
      description: 'Descrição breve para listagem de produtos'
    }),
    defineField({
      name: 'images',
      title: 'Imagens',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo'
            }
          ]
        }
      ],
      validation: Rule => Rule.min(1).error('Pelo menos uma imagem é obrigatória')
    }),
    defineField({
      name: 'price',
      title: 'Preço',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Preço Original (Riscado)',
      type: 'number',
      description: 'Preço antes do desconto (opcional)'
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'brand',
      title: 'Marca',
      type: 'string'
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Código único do produto'
    }),
    defineField({
      name: 'stock',
      title: 'Estoque',
      type: 'number',
      validation: Rule => Rule.min(0)
    }),
    defineField({
      name: 'weight',
      title: 'Peso (g)',
      type: 'number',
      description: 'Peso em gramas para cálculo de frete'
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensões',
      type: 'object',
      fields: [
        { name: 'length', type: 'number', title: 'Comprimento (cm)' },
        { name: 'width', type: 'number', title: 'Largura (cm)' },
        { name: 'height', type: 'number', title: 'Altura (cm)' }
      ]
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'featured',
      title: 'Produto em Destaque',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'active',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'seoTitle',
      title: 'Título SEO',
      type: 'string',
      description: 'Título otimizado para SEO (deixe vazio para usar o nome do produto)'
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descrição SEO',
      type: 'text',
      rows: 3,
      description: 'Descrição otimizada para SEO'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      media: 'images.0'
    }
  },
  orderings: [
    {
      title: 'Nome A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    },
    {
      title: 'Nome Z-A',
      name: 'nameDesc',
      by: [{ field: 'name', direction: 'desc' }]
    },
    {
      title: 'Preço Menor-Maior',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }]
    },
    {
      title: 'Preço Maior-Menor',
      name: 'priceDesc',
      by: [{ field: 'price', direction: 'desc' }]
    }
  ]
});