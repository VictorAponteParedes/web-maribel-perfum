export const WebRoutes = {
  HOME: '/',
  COMBOS: '/combos',
  CATALOG: '/catalogo',
  PRODUCT_DETAIL: '/producto/:id',
  COMBO_DETAIL: '/combo/:id',
  CHECKOUT: '/checkout',

  // Dynamic route helpers
  productDetail: (id: string | number) => `/producto/${id}`,
  comboDetail: (id: string | number) => `/combo/${id}`,
} as const;

export const getProductDetailRoute = (id: string | number) => `/producto/${id}`;
export const getComboDetailRoute = (id: string | number) => `/combo/${id}`;
