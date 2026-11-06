export const CATALOG_ROUTES = {
  ROOT: '/catalogo',
  DETAIL: (id: string) => `/catalogo/${id}`,
} as const;
