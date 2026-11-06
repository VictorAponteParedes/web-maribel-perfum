import React from 'react';

interface CombosTagsFilterProps {
  tags: string[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

export const CombosTagsFilter: React.FC<CombosTagsFilterProps> = ({
  tags,
  selectedTag,
  onSelectTag,
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar mb-8">
      {tags.map((tag) => {
        const isSelected = selectedTag === tag;
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onSelectTag(tag)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              isSelected
                ? 'bg-[#5a061a] text-white shadow-sm shadow-[#5a061a]/25'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
};
