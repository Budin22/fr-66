import { useMemo } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchProduct } from "../api/products-api";
import { TProductsList} from "../components/ProductsView/types";

export const useProductsQuery = (): UseQueryResult<TProductsList> => {
  const data = useQuery(["products"], fetchProduct, {
    staleTime: 60000,
  });
  return useMemo(() => data, [data]);
};
