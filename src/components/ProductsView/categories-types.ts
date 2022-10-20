export interface CategoriesProps {
  selectedCategory: string[];
  selectCategoryHandler: (category: string) => void;
}

export interface Category {
  name: string;
  id: string;
}
