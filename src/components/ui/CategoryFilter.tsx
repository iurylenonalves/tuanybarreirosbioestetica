'use client';

import { useState } from 'react';

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categorySlug: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {/* Botão "Todos" */}
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
          selectedCategory === 'all'
            ? 'bg-brand-text-button text-white shadow-md'
            : 'bg-brand-off-white text-brand-text-button hover:bg-brand-pink-light border border-brand-dark-nude/20'
        }`}
      >
        Todos
      </button>
      
      {/* Botões das categorias */}
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => onCategoryChange(category.slug.current)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
            selectedCategory === category.slug.current
              ? 'bg-brand-text-button text-white shadow-md'
              : 'bg-brand-off-white text-brand-text-button hover:bg-brand-pink-light border border-brand-dark-nude/20'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}