import { defineField, defineType } from 'sanity'
import { Images } from 'lucide-react'

export const resultsType = defineType({
  name: 'results',
  title: 'Galeria de Resultados',
  type: 'document',
  icon: Images,
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Seção',
      type: 'string',
      initialValue: 'Resultados',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 2,
      initialValue: 'Transformações que inspiram confiança.',
    }),
    defineField({
      name: 'images',
      title: 'Imagens de Resultados',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Descrição da Imagem (Alt Text)',
              type: 'string',
              description: 'Importante para acessibilidade e SEO',
            },
            {
              name: 'caption',
              title: 'Legenda',
              type: 'string',
              description: 'Ex: Tratamento de Acne - 3 sessões',
            }
          ],
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Galeria de Resultados',
        subtitle: 'Seção da Home',
        media,
      }
    },
  },
})
