import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-background': '#FFFCFA', // Fundo principal claro
        'brand-soft-beige': '#EAE4DD', // Bege suave
        'brand-light-nude': '#FBE9E9', // Nude claro de destaque
        'brand-dark-nude': '#D6C4C0',  // Nude mais escuro/sutil
        // Você pode adicionar a cor do texto principal aqui também
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config