import { defineField, defineType } from 'sanity'
import { Star } from 'lucide-react'

export const featuresType = defineType({
  name: 'features',
  title: 'Seção Diferenciais',
  type: 'document',
  icon: Star,
  fields: [
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      initialValue: 'Por que escolher nossos serviços',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      initialValue: 'Transformação que vai além da aparência.',
    }),
    defineField({
      name: 'items',
      title: 'Lista de Diferenciais',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'eyebrow',
              title: 'Texto de Destaque (Eyebrow)',
              type: 'string',
              description: 'Texto pequeno em caixa alta. Ex: DE DENTRO PARA FORA',
            }),
            defineField({
              name: 'title',
              title: 'Título do Item',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Descrição',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Imagem Ilustrativa',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'eyebrow',
              media: 'image',
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
})
