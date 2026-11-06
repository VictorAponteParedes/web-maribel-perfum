import React from 'react';
import { CategoryMenuProps } from './types';
import { CategorySearch } from './CategorySearch';
import { CategoryItem } from './CategoryItem';

export const CategoryMenu: React.FC<CategoryMenuProps> = ({
  categories,
  activeCategory,
  totalProductsCount,
  searchFilter,
  onSearchChange,
  onSelect,
  searchInputRef,
}) => {
  const isAll = activeCategory === 'Todos';

  const filteredCategories = categories.filter((cat) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      (cat.description && cat.description.toLowerCase().includes(q))
    );
  });

  return (
    <div className="absolute z-50 left-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
      {/* Cabecera del dropdown con buscador si hay categorías */}
      {categories.length > 3 && (
        <CategorySearch
          value={searchFilter}
          onChange={onSearchChange}
          inputRef={searchInputRef}
        />
      )}

      {/* Opciones con scroll */}
      <div className="max-h-72 overflow-y-auto p-2 space-y-1">
        {/* Opción destacada: Todas las Fragancias */}
        <CategoryItem
          title="Todas las Fragancias"
          description="Explora todo nuestro catálogo completo"
          count={totalProductsCount}
          isSelected={isAll}
          isSpecialAll
          onSelect={() => onSelect('Todos')}
        />

        {categories.length > 0 && <div className="border-t border-stone-100 my-1" />}

        {/* Lista de categorías desde la base de datos */}
        {filteredCategories.map((cat) => {
          const isSelected =
            activeCategory.toLowerCase() === cat.name.toLowerCase();

          return (
            <CategoryItem
              key={cat.id}
              title={cat.name}
              description={cat.description}
              isSelected={isSelected}
              onSelect={() => onSelect(cat.name)}
            />
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="py-6 text-center text-xs text-stone-400">
            No se encontraron categorías que coincidan.
          </div>
        )}
      </div>
    </div>
  );
};
