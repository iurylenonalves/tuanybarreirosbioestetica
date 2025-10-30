import { defineField, defineType } from 'sanity';
import { Package } from 'lucide-react';

export const servicePackageType = defineType({
  name: 'servicePackage',
  title: 'Pacotes de Serviços',
  type: 'document',
  icon: Package,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Pacote',
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
      title: 'Descrição Completa',
      type: 'blockContent'
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrição Resumida',
      type: 'text',
      rows: 3,
      description: 'Descrição breve para listagem'
    }),
    defineField({
      name: 'image',
      title: 'Imagem Principal',
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
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria de Imagens',
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
      ]
    }),
    defineField({
      name: 'price',
      title: 'Preço do Pacote',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'originalPrice',
      title: 'Preço Original',
      type: 'number',
      description: 'Preço sem desconto (para mostrar economia)'
    }),
    defineField({
      name: 'duration',
      title: 'Duração Total',
      type: 'string',
      description: 'Ex: 2 meses, 6 sessões, etc.'
    }),
    defineField({
      name: 'sessions',
      title: 'Número de Sessões',
      type: 'number',
      description: 'Quantidade de sessões incluídas no pacote'
    }),
    defineField({
      name: 'includedServices',
      title: 'Serviços Inclusos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'service',
              title: 'Serviço',
              type: 'string'
            },
            {
              name: 'quantity',
              title: 'Quantidade',
              type: 'number',
              initialValue: 1
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'text',
              rows: 2
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'benefits',
      title: 'Benefícios',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista de benefícios do pacote'
    }),
    defineField({
      name: 'targetAudience',
      title: 'Público-Alvo',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Para quem é indicado este pacote'
    }),
    defineField({
      name: 'contraindications',
      title: 'Contraindicações',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Quando não é recomendado'
    }),
    defineField({
      name: 'beforeAfterGallery',
      title: 'Galeria Antes/Depois',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'before',
              title: 'Antes',
              type: 'image',
              options: { hotspot: true }
            },
            {
              name: 'after',
              title: 'Depois',
              type: 'image',
              options: { hotspot: true }
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'string'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'category' }]
    }),
    defineField({
      name: 'featured',
      title: 'Pacote em Destaque',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'popular',
      title: 'Mais Procurado',
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
      name: 'bookingRequired',
      title: 'Requer Agendamento',
      type: 'boolean',
      initialValue: true,
      description: 'Se marcado, direciona para agendamento em vez de carrinho'
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'seoTitle',
      title: 'Título SEO',
      type: 'string',
      description: 'Título otimizado para SEO'
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
      media: 'image',
      price: 'price'
    },
    prepare(selection) {
      const {title, subtitle, media, price} = selection
      return {
        title,
        subtitle: subtitle ? `${subtitle} - R$ ${price}` : `R$ ${price}`,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Ordem de Exibição',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Nome A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    },
    {
      title: 'Preço Menor-Maior',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }]
    }
  ]
});