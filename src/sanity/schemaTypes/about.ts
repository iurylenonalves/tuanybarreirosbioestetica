import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'Seção Sobre Mim',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome Profissional',
      type: 'string',
      initialValue: 'Dra. Tuany Barreiros',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Cargo / Registro',
      type: 'string',
      initialValue: 'Biomédica Esteta | CRBM 61904',
    }),
    defineField({
      name: 'bio',
      title: 'Biografia Completa',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Texto principal sobre sua trajetória e abordagem.',
    }),
    defineField({
      name: 'shortBio',
      title: 'Resumo da Bio (Home)',
      type: 'text',
      rows: 4,
      description: 'Um resumo curto para aparecer na página inicial.',
    }),
    defineField({
      name: 'image',
      title: 'Foto de Perfil',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
        }
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'qualities',
      title: 'Qualidades / Diferenciais',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista de diferenciais (ex: Atendimento Humanizado, Tecnologia de Ponta)',
    }),
    defineField({
      name: 'stats',
      title: 'Estatísticas / Destaques',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Rótulo (ex: Experiência)' },
            { name: 'value', type: 'string', title: 'Valor (ex: 7 anos)' },
          ]
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
