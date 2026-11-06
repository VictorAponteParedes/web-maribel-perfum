import { Combo } from '@/types/product.types';

export const COMBO_TAGS = ['Todos', 'Para Ella', 'Para Él', 'Árabes', 'Tríos'] as const;
export type ComboTag = (typeof COMBO_TAGS)[number];

export const filterCombos = (
  combos: Combo[],
  selectedTag: string,
  searchQuery: string
): Combo[] => {
  const query = searchQuery.trim().toLowerCase();

  return combos.filter((combo) => {
    const kickerNorm = (combo.kicker || '').toLowerCase();
    const titleNorm = (combo.title || '').toLowerCase();
    const descNorm = (combo.description || '').toLowerCase();
    const countLabelNorm = (combo.fragranceCountLabel || '').toLowerCase();

    const matchesTag =
      selectedTag === 'Todos' ||
      (selectedTag === 'Para Ella' &&
        (kickerNorm.includes('floral') ||
          kickerNorm.includes('boutique') ||
          kickerNorm.includes('ella') ||
          titleNorm.includes('girl') ||
          descNorm.includes('ella'))) ||
      (selectedTag === 'Para Él' &&
        (kickerNorm.includes('ventas') ||
          kickerNorm.includes('masculino') ||
          kickerNorm.includes('él') ||
          titleNorm.includes('caballeros') ||
          descNorm.includes('él'))) ||
      (selectedTag === 'Árabes' &&
        (kickerNorm.includes('oriental') ||
          kickerNorm.includes('árabe') ||
          titleNorm.includes('oud') ||
          descNorm.includes('árabe'))) ||
      (selectedTag === 'Tríos' &&
        (countLabelNorm.includes('3') || titleNorm.includes('trío')));

    if (!matchesTag) return false;
    if (!query) return true;

    return titleNorm.includes(query) || descNorm.includes(query);
  });
};
