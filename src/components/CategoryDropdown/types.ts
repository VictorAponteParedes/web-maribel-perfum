import { Category } from '@/features/categories/types/category.types';

export interface CategoryDropdownProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (categoryName: string) => void;
  totalProductsCount?: number;
  className?: string;
}

export interface CategoryTriggerProps {
  isOpen: boolean;
  isAll: boolean;
  activeCategory: string;
  activeDescription?: string | null;
  onToggle: () => void;
  onClear: () => void;
}

export interface CategorySearchProps {
  value: string;
  onChange: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export interface CategoryItemProps {
  title: string;
  description?: string | null;
  count?: number;
  isSelected: boolean;
  isSpecialAll?: boolean;
  onSelect: () => void;
}

export interface CategoryMenuProps {
  categories: Category[];
  activeCategory: string;
  totalProductsCount?: number;
  searchFilter: string;
  onSearchChange: (value: string) => void;
  onSelect: (categoryName: string) => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
}
