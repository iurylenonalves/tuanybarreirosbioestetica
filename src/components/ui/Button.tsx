import React from 'react';

// Definimos as propriedades que nosso botão pode aceitar
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ 
  children, 
  variant = 'primary', // O padrão será sempre 'primary'
  className, 
  ...props 
}: ButtonProps) {
  
  // Estilos base, comuns a todos os botões
  const baseStyles = 'px-8 py-3 rounded-lg font-semibold transition-all duration-300';

  // Estilos específicos para cada variante
  const variantStyles = {
    primary: 'bg-brand-background text-brand-text-button shadow-md cursor-pointer hover:shadow-lg hover:brightness-95',
    secondary: 'bg-[#0C0B0B]/5 text-brand-text-button cursor-pointer hover:bg-[#0C0B0B]/10',
  };

  // Combinamos os estilos base, os da variante e qualquer outra classe que for passada
  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}