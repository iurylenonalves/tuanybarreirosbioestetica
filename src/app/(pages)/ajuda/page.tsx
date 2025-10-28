export default function AjudaPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📝 Guia do Blog
          </h1>
          <p className="text-xl text-gray-600">
            Como criar, editar e gerenciar posts do blog
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-12">
          
          {/* Acesso rápido */}
          <section className="border-l-4 border-blue-500 pl-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Acesso Rápido</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="/studio" 
                target="_blank"
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors"
              >
                <div className="font-semibold text-blue-900">🎨 Sanity Studio</div>
                <div className="text-sm text-blue-700">Criar e editar posts</div>
              </a>
              <a 
                href="/blog" 
                className="bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition-colors"
              >
                <div className="font-semibold text-green-900">📰 Blog Público</div>
                <div className="text-sm text-green-700">Ver posts publicados</div>
              </a>
            </div>
          </section>

          {/* Como criar posts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">✍️ Como Criar Posts</h2>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">📝 Para Rascunho (Draft)</h3>
                <ol className="list-decimal list-inside space-y-2 text-yellow-700">
                  <li>Acesse o <strong>Studio</strong> (link acima)</li>
                  <li>Clique em <strong>"Post"</strong> → <strong>"+ Create"</strong></li>
                  <li>Preencha: Título, Conteúdo, Imagem</li>
                  <li><strong>NÃO preencha</strong> "Published At"</li>
                  <li>Pressione <strong>Ctrl+S</strong> para salvar</li>
                </ol>
                <div className="mt-3 text-sm text-yellow-600">
                  ✅ Post salvo como rascunho (só você vê)
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">🚀 Para Publicar</h3>
                <ol className="list-decimal list-inside space-y-2 text-green-700">
                  <li>Crie o post normalmente</li>
                  <li><strong>Preencha</strong> o campo "Published At" com a data atual</li>
                  <li>Pressione <strong>Ctrl+S</strong> para salvar</li>
                </ol>
                <div className="mt-3 text-sm text-green-600">
                  ✅ Post publicado (aparece no blog automaticamente)
                </div>
              </div>
            </div>
          </section>

          {/* Sistema de Preview */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">👁️ Sistema de Preview</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">🔍 Como ver rascunhos antes de publicar</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-blue-700 mb-2"><strong>1. Crie o post como rascunho</strong></p>
                  <p className="text-blue-700 mb-2"><strong>2. Copie o "slug" do post</strong> (campo URL no Studio)</p>
                  <p className="text-blue-700 mb-2"><strong>3. Use esta URL:</strong></p>
                </div>
                
                <div className="bg-blue-100 border border-blue-300 rounded p-3 font-mono text-sm break-all">
                  <span className="text-blue-600">
                    {typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/api/draft?secret=tuany-preview-2024-secret&slug=/blog/
                  </span>
                  <span className="bg-yellow-200 px-1">SEU-SLUG</span>
                </div>
                
                <div className="text-sm text-blue-600">
                  <strong>Exemplo:</strong> Se o slug for "minha-dica-de-skincare", a URL fica:<br/>
                  <code className="bg-blue-100 px-2 py-1 rounded">
                    .../api/draft?secret=tuany-preview-2024-secret&slug=/blog/minha-dica-de-skincare
                  </code>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>💡 Dica:</strong> Quando estiver no modo preview, você verá uma 
                <span className="bg-yellow-200 px-2 py-1 mx-1 rounded text-sm">faixa amarela</span> 
                no topo dos posts.
              </p>
            </div>
          </section>

          {/* URLs úteis */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Links Úteis</h2>
            
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-semibold">Sair do Preview Mode</div>
                  <div className="text-sm text-gray-600">Remove a faixa amarela</div>
                </div>
                <a 
                  href="/api/disable-draft"
                  className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition-colors"
                >
                  Clique aqui
                </a>
              </div>
            </div>
          </section>

          {/* Workflow */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🔄 Fluxo de Trabalho Recomendado</h2>
            
            <div className="bg-linear-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-purple-800 mb-3">📝 Posts Novos</h3>
                  <ol className="text-sm space-y-1 text-purple-700">
                    <li>1. Escrever no Studio (sem data)</li>
                    <li>2. Testar no preview</li>
                    <li>3. Fazer ajustes</li>
                    <li>4. Preencher "Published At"</li>
                    <li>5. Post vai ao ar! 🚀</li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="font-semibold text-pink-800 mb-3">✏️ Posts Existentes</h3>
                  <ol className="text-sm space-y-1 text-pink-700">
                    <li>1. Editar no Studio</li>
                    <li>2. Salvar mudanças</li>
                    <li>3. Mudanças já estão no ar! ✅</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Solução de problemas */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🆘 Se Algo Der Errado</h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800">❓ Post não aparece no blog</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Verifique se "Published At" está preenchido</li>
                  <li>• Aguarde alguns segundos e atualize a página</li>
                  <li>• Confirme se salvou o post (Ctrl+S)</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800">❓ Preview não funciona</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Verifique se o slug está correto na URL</li>
                  <li>• Confirme se o post foi salvo no Studio</li>
                  <li>• Tente acessar o post normalmente primeiro</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              💝 Qualquer dúvida, chame o desenvolvedor!<br/>
              <span className="text-sm">Sistema funcionando perfeitamente ✨</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Guia do Blog - Ajuda',
  description: 'Como usar o sistema de blog e preview',
}