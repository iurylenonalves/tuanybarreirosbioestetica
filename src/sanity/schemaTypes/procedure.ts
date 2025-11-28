import { defineField, defineType } from 'sanity'

export const procedureType = defineType({
  name: 'procedure',
  title: 'Procedimentos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Procedimento',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Faciais', value: 'facial' },
          { title: 'Corporais', value: 'corporal' },
          { title: 'Terapias Manuais', value: 'terapias_manuais' },
          { title: 'Consultoria Integrativa', value: 'consultoria' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrição Curta',
      type: 'text',
      rows: 3,
      description: 'Descrição focada em benefícios (ex: "Restaure a juventude...")',
    }),
    defineField({
      name: 'image',
      title: 'Imagem Ilustrativa',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'featured',
      title: 'Destaque na Home?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
})
