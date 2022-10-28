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

export interface FilterProps {
  ratingChange: (rating: number[]) => void;
  priceChange: (price: number[]) => void;
  rating: number[];
  price: number[];
  isNewChange: (isNew: boolean) => void;
  isSaleChange: (isSale: boolean) => void;
  isInStockChange: (isInStock: boolean) => void;
  limRating: number[];
  limPrice: number[];
  isNew: boolean;
  isSale: boolean;
  isInStock: boolean;
}

export interface SearchProps {
  changeSearchValue: (value: string) => void;
  searchValue: string;
}
