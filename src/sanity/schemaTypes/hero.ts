import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Seção Hero (Início)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo / Frase de Impacto',
      type: 'text',
      rows: 3,
      description: 'A frase que aparece abaixo do título. Ótimo para testar diferentes gatilhos mentais.',
    }),
    defineField({
      name: 'carouselImages',
      title: 'Imagens do Carrossel',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Texto Alternativo (SEO)',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Título do Slide',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Descrição do Slide',
              type: 'text',
              rows: 2,
            }
          ]
        }
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto do Botão Principal',
      type: 'string',
      initialValue: 'Agendar',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Link do Botão Principal',
      type: 'string',
      initialValue: '/agendar',
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Texto do Botão Secundário',
      type: 'string',
      initialValue: 'Saiba mais',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Link do Botão Secundário',
      type: 'string',
      initialValue: '/sobre',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'carouselImages.0',
    },
  },
})
