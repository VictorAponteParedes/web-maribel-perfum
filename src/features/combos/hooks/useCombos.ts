import { useState, useEffect, useMemo, useCallback } from 'react';
import { useCombosStore } from '../store/useCombosStore';
import { COMBO_TAGS, filterCombos } from '../utils/combos.utils';

export const useCombos = (initialTag: string = 'Todos') => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>(initialTag);

  const combos = useCombosStore((state) => state.combos);
  const isLoading = useCombosStore((state) => state.isLoading);
  const error = useCombosStore((state) => state.error);
  const fetchCombos = useCombosStore((state) => state.fetchCombos);

  useEffect(() => {
    fetchCombos();
  }, [fetchCombos]);

  const refetch = useCallback(() => {
    return fetchCombos(true);
  }, [fetchCombos]);

  const filteredCombos = useMemo(() => {
    return filterCombos(combos, selectedTag, searchQuery);
  }, [combos, selectedTag, searchQuery]);

  return {
    combos,
    filteredCombos,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    tags: COMBO_TAGS,
    refetch,
  };
};
