import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Estilos de parágrafo (Normal, Título 1, etc.)
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
        {title: 'Texto Justificado', value: 'justify'},
      ],
      // Estilos de lista (Bala, Numerada)
      lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}],
      // Estilos de texto (Negrito, Itálico)
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
      },
    }),
    // Você pode adicionar outros tipos aqui, como imagens no meio do texto
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})