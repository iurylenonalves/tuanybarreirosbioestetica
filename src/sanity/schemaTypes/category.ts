import { defineField, defineType } from 'sanity';
import { Tag } from 'lucide-react';

export const categoryType = defineType({
  name: 'category',
  title: 'Categorias',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Categoria',
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
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'image',
      title: 'Imagem da Categoria',
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
    }),
    defineField({
      name: 'parent',
      title: 'Categoria Pai',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Deixe vazio para categoria principal'
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'active',
      title: 'Ativa',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'seoTitle',
      title: 'Título SEO',
      type: 'string',
      description: 'Título otimizado para SEO (deixe vazio para usar o nome da categoria)'
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
      subtitle: 'parent.name',
      media: 'image'
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title,
        subtitle: subtitle ? `${subtitle} > ${title}` : title,
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
    }
  ]
});