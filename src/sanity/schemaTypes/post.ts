import {defineField, defineType} from 'sanity'

export default defineType({
  
  name: 'post',  
  title: 'Post do Blog',  
  type: 'document',

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      publishedAt: 'publishedAt',
      slug: 'slug.current',
    },
    prepare({title, media, publishedAt, slug}) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('pt-BR') : 'Sem data'
      return {
        title: title || 'Post sem título',
        subtitle: `${date} • /blog/${slug || 'sem-slug'}`,
        media,
      }
    },
  },

  // Define the fields that each "Post" will have
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Post',
      type: 'string',
      validation: Rule => Rule.required(), // Required field
    }),
    defineField({
      name: 'slug',
      title: 'URL do Post (Slug)',
      type: 'slug',
      description: '💡 Para preview: copie este slug e acesse http://localhost:3000/api/draft?secret=SEU_SECRET&slug=/blog/SEU-SLUG (configure SEU_SECRET no .env.local)',
      options: {
        source: 'title', // Automatically generates the slug from the title
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: {
        hotspot: true, // Allows adjusting the focus of the image
      },
      fields: [ // Adding an 'alt' text field for accessibility
        {
          name: 'alt',
          type: 'string',
          title: 'Descrição da Imagem',
          description: 'Descreva a imagem para acessibilidade.',
          validation: Rule => Rule.required(),
        }
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      description: 'Quando este post deve ser publicado',
      validation: Rule => Rule.required(),
      initialValue: () => new Date().toISOString(), // Date defaults to now
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo do Post',
      type: 'blockContent', // A custom type for the rich text editor
      description: 'Escreva o conteúdo do seu post aqui',
      validation: Rule => Rule.required(),
    }),
  ],
})