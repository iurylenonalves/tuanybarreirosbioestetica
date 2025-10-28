import {defineField, defineType} from 'sanity'

export default defineType({
  // O nome interno do schema (não pode ter espaços)
  name: 'post',
  // O nome que aparecerá no painel do Sanity Studio
  title: 'Post do Blog',
  // O tipo de schema
  type: 'document',

  // Configuração de preview personalizada
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

  // Aqui definimos os campos que cada "Post" terá
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Post',
      type: 'string',
      validation: Rule => Rule.required(), // Campo obrigatório
    }),
    defineField({
      name: 'slug',
      title: 'URL do Post (Slug)',
      type: 'slug',
      description: '💡 Para preview: copie este slug e acesse http://localhost:3000/api/draft?secret=tuany-preview-2024-secret&slug=/blog/SEU-SLUG',
      options: {
        source: 'title', // Gera o slug automaticamente a partir do título
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: {
        hotspot: true, // Permite ajustar o foco da imagem
      },
      fields: [ // Adicionando um campo de 'alt' text para acessibilidade
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
      initialValue: () => new Date().toISOString(), // Data atual por padrão
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo do Post',
      type: 'blockContent', // Um tipo customizado para o editor de texto rico
      description: 'Escreva o conteúdo do seu post aqui',
      validation: Rule => Rule.required(),
    }),
  ],
})