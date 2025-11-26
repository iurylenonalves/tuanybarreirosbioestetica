import { defineField, defineType } from 'sanity'

export const methodologyType = defineType({
  name: 'methodology',
  title: 'Seção Metodologia (Como Funciona)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Seção',
      type: 'string',
      initialValue: 'Como funcionam os meus atendimentos',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição Principal',
      type: 'text',
      rows: 4,
      description: 'Texto introdutório sobre a abordagem.',
    }),
    defineField({
      name: 'steps',
      title: 'Passos do Atendimento',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Título do Passo' },
            { name: 'description', type: 'text', title: 'Descrição do Passo', rows: 3 },
          ]
        }
      ]
    }),
    defineField({
      name: 'closingText',
      title: 'Texto de Fechamento',
      type: 'text',
      rows: 3,
      description: 'Texto final antes do botão (ex: "Na minha clínica, você encontra...")',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto do Botão',
      type: 'string',
      initialValue: 'Agende sua avaliação',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Link do Botão',
      type: 'string',
      initialValue: '/agendar',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
