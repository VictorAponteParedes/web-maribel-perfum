import React, { useState, useRef, useEffect } from 'react';
import { CategoryDropdownProps } from './types';
import { CategoryTrigger } from './CategoryTrigger';
import { CategoryMenu } from './CategoryMenu';

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  totalProductsCount,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const activeCategoryObj = categories.find(
    (c) => c.name.toLowerCase() === activeCategory.toLowerCase()
  );

  const isAll = activeCategory === 'Todos';

  const handleSelect = (categoryName: string) => {
    onSelectCategory(categoryName);
    setIsOpen(false);
    setSearchFilter('');
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <CategoryTrigger
        isOpen={isOpen}
        isAll={isAll}
        activeCategory={activeCategory}
        activeDescription={activeCategoryObj?.description}
        onToggle={() => setIsOpen((prev) => !prev)}
        onClear={() => handleSelect('Todos')}
      />

      {isOpen && (
        <CategoryMenu
          categories={categories}
          activeCategory={activeCategory}
          totalProductsCount={totalProductsCount}
          searchFilter={searchFilter}
          onSearchChange={setSearchFilter}
          onSelect={handleSelect}
          searchInputRef={searchInputRef}
        />
      )}
    </div>
  );
};
