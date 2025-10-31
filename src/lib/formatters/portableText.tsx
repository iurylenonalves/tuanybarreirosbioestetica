import { PortableTextComponents } from 'next-sanity';

/**
 * Componentes customizados para PortableText
 * Mantém consistência visual em todo o projeto
 */
export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-text-button pl-4 my-6 italic text-gray-600 bg-brand-pink-light py-2">
        {children}
      </blockquote>
    ),
    justified: ({ children }) => (
      <p className="mb-4 text-gray-700 leading-relaxed text-justify">{children}</p>
    )
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ children, value }) => (
      <a 
        href={value.href} 
        className="text-brand-text-button hover:underline font-medium"
        target={value.blank ? '_blank' : undefined}
        rel={value.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside my-4 space-y-2 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside my-4 space-y-2 text-gray-700">
        {children}
      </ol>
    )
  }
};