import { httpClient } from "@/lib/httpClient";
import { Category } from "../types/category.types";

export const categoriesService = {
  fetchCategories: async (): Promise<Category[]> => {
    const response = await httpClient.get("/products/categories");
    const items: Category[] = response.data?.data || [];

    return items
      .filter((c) => c.isActive)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  },
};
