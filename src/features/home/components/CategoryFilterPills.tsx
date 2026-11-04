import React from 'react';

interface CategoryFilterPillsProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilterPills: React.FC<CategoryFilterPillsProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar -mx-4 px-4 mt-2">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
              isActive
                ? 'bg-[#5a061a] text-white shadow-sm shadow-[#5a061a]/25'
                : 'bg-white text-stone-600 border border-stone-200/90 hover:bg-stone-50'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
