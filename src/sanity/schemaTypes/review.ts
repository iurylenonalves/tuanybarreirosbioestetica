import { defineField, defineType } from 'sanity';
import { Star } from 'lucide-react';

export const reviewType = defineType({
  name: 'review',
  title: 'Avaliações',
  type: 'document',
  icon: Star,
  fields: [
    defineField({
      name: 'customerName',
      title: 'Nome do Cliente',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'customerEmail',
      title: 'Email do Cliente',
      type: 'string',
      validation: Rule => Rule.email()
    }),
    defineField({
      name: 'product',
      title: 'Produto',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'Deixe vazio se for avaliação de pacote de serviço'
    }),
    defineField({
      name: 'servicePackage',
      title: 'Pacote de Serviço',
      type: 'reference',
      to: [{ type: 'servicePackage' }],
      description: 'Deixe vazio se for avaliação de produto'
    }),
    defineField({
      name: 'rating',
      title: 'Nota',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
      options: {
        list: [
          { title: '⭐ 1 estrela', value: 1 },
          { title: '⭐⭐ 2 estrelas', value: 2 },
          { title: '⭐⭐⭐ 3 estrelas', value: 3 },
          { title: '⭐⭐⭐⭐ 4 estrelas', value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5 estrelas', value: 5 }
        ]
      }
    }),
    defineField({
      name: 'title',
      title: 'Título da Avaliação',
      type: 'string'
    }),
    defineField({
      name: 'comment',
      title: 'Comentário',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'images',
      title: 'Fotos',
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
      name: 'verified',
      title: 'Compra Verificada',
      type: 'boolean',
      initialValue: false,
      description: 'Cliente realmente comprou o produto/serviço'
    }),
    defineField({
      name: 'featured',
      title: 'Avaliação em Destaque',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'approved',
      title: 'Aprovada',
      type: 'boolean',
      initialValue: false,
      description: 'Aprovada para exibição no site'
    }),
    defineField({
      name: 'response',
      title: 'Resposta da Empresa',
      type: 'object',
      fields: [
        {
          name: 'message',
          title: 'Mensagem',
          type: 'text',
          rows: 3
        },
        {
          name: 'respondedAt',
          title: 'Data da Resposta',
          type: 'datetime'
        },
        {
          name: 'respondedBy',
          title: 'Respondido por',
          type: 'string'
        }
      ]
    }),
    defineField({
      name: 'createdAt',
      title: 'Data da Avaliação',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    })
  ],
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'title',
      rating: 'rating',
      productName: 'product.name',
      packageName: 'servicePackage.name'
    },
    prepare(selection) {
      const {title, subtitle, rating, productName, packageName} = selection
      const stars = '⭐'.repeat(rating)
      const itemName = productName || packageName || 'Item não especificado'
      
      return {
        title: `${title} - ${stars}`,
        subtitle: subtitle || itemName
      }
    }
  },
  orderings: [
    {
      title: 'Mais Recentes',
      name: 'newestFirst',
      by: [{ field: 'createdAt', direction: 'desc' }]
    },
    {
      title: 'Maior Nota',
      name: 'highestRating',
      by: [{ field: 'rating', direction: 'desc' }]
    },
    {
      title: 'Menor Nota',
      name: 'lowestRating',
      by: [{ field: 'rating', direction: 'asc' }]
    }
  ]
});