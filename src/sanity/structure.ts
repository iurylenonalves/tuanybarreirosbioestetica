import type {StructureResolver} from 'sanity/structure'
import React from 'react'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Tuany Bioestetica CMS')
    .items([
      // Link to Blog Guide
      S.listItem()
        .title('📚 Guia do Blog')
        .id('guia-do-blog')
        .child(
          S.component()
            .id('guia-component')
            .component(() => {
              return React.createElement('div', {
                style: {
                  padding: '40px',
                  textAlign: 'center',
                  fontFamily: 'system-ui'
                }
              }, [
                React.createElement('h2', {
                  key: 'title',
                  style: { marginBottom: '20px' }
                }, '📚 Guia do Blog'),
                
                React.createElement('p', {
                  key: 'desc',
                  style: { marginBottom: '30px', color: '#666' }
                }, 'Aprenda como usar o blog e sistema de preview'),
                
                React.createElement('div', {
                  key: 'buttons',
                  style: { display: 'flex', gap: '10px', justifyContent: 'center' }
                }, [
                  React.createElement('a', {
                    key: 'help',
                    href: '/ajuda',
                    target: '_blank',
                    style: {
                      padding: '12px 24px',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontWeight: '500'
                    }
                  }, '📖 Ver Guia Completo'),
                  
                  React.createElement('a', {
                    key: 'blog',
                    href: '/blog',
                    target: '_blank',
                    style: {
                      padding: '12px 24px',
                      backgroundColor: '#059669',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontWeight: '500'
                    }
                  }, '🌐 Ver Blog')
                ])
              ])
            })
        ),
      
      S.divider(),
      
      // Blog Section
      S.listItem()
        .title('📝 Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Posts')
                .schemaType('post')
                .child(S.documentTypeList('post')),
            ])
        ),
      
      S.divider(),
      
      // E-commerce Section
      S.listItem()
        .title('🛒 Loja')
        .child(
          S.list()
            .title('Loja')
            .items([
              S.listItem()
                .title('Produtos')
                .schemaType('product')
                .child(S.documentTypeList('product')),
              
              S.listItem()
                .title('Pacotes de Serviços')
                .schemaType('servicePackage')
                .child(S.documentTypeList('servicePackage')),
              
              S.listItem()
                .title('Categorias')
                .schemaType('category')
                .child(S.documentTypeList('category')),
              
              S.listItem()
                .title('Avaliações')
                .schemaType('review')
                .child(S.documentTypeList('review')),
            ])
        ),
      
      S.divider(),
      
      // Remaining items (if any)
      ...S.documentTypeListItems().filter(listItem => 
        !['post', 'product', 'servicePackage', 'category', 'review'].includes(listItem.getId() || '')
      ),
    ])
