import { defineField, defineType } from 'sanity'

export const servicesHeroType = defineType({
  name: 'servicesHero',
  title: 'Seção Hero (Procedimentos)',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Texto Superior (Pequeno)',
      type: 'string',
      description: 'Texto pequeno em caixa alta acima do título principal. (Opcional)',
    }),
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      initialValue: 'Nossos serviços',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição / Frase de Impacto',
      type: 'text',
      rows: 3,
      initialValue: 'Cada tratamento é uma jornada única de cuidado e transformação pessoal.',
      description: 'Use este espaço para testar os gatilhos mentais e frases de impacto.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Hero de Serviços',
        subtitle: subtitle,
      }
    },
  },
})
