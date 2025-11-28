import React from 'react';

// Definimos as propriedades que nosso botão pode aceitar
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ 
  children, 
  variant = 'primary', // Default button variant
  className, 
  ...props 
}: ButtonProps) {
  
  // Base styles, common to all buttons
  const baseStyles = 'px-8 py-3 rounded-lg font-semibold transition-colors duration-300';

  // Styles specific to each variant
  const variantStyles = {
    primary: 'bg-brand-text-button hover:bg-brand-brown text-white',
    secondary: 'bg-brand-off-white text-brand-text-button border-2 border-brand-text-button hover:bg-brand-pink-light',
  };

  // Bases, variant and additional classes combined
  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}