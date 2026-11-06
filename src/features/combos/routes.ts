export const COMBOS_ROUTES = {
  ROOT: '/combos',
  DETAIL: (id: string) => `/combos/${id}`,
} as const;
