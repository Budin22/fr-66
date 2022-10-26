export interface ProductItem {
  photo: string;
  title: string;
  description: string;
  price: string;
  id: string;
  rating: number;
  isNew: boolean;
  isSale: boolean;
  isInStock: boolean;
  categories: string[];
}

export interface ProductsListSinglItem {
  product: ProductItem;
}

export interface FilterValue {
  isNew: boolean;
  isSale: boolean;
  isInStock: boolean;
}

export interface FilterProps {
  filterHandler: (filterValue: FilterValue) => void;
  ratingHandler: (rating: number[]) => void;
  priceHandler: (price: number[]) => void;
  rating: number[];
  price: number[];
}

export interface SearchProps {
  changeSearchValue: (value: string) => void;
}
