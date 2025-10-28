import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Link para Ajuda
      S.listItem()
        .title('📚 Guia do Blog')
        .id('guia-do-blog') // ID obrigatório adicionado
        .child(
          S.component()
            .id('guia-component') // ID para o componente também
            .component(() => {
              // Criar um componente React simples
              const React = require('react')
              
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
      
      // Items normais do CMS
      ...S.documentTypeListItems(),
    ])
