export interface CategoriesProps {
  selectedCategory: string[];
  selectCategoryHandler: (category: string) => void;
  selectAllCategories: boolean
}

export interface Category {
  name: string;
  id: string;
}
