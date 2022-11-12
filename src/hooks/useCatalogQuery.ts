import { useMemo } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchCatalog } from "../api/catalog-api";
import { Category } from "../components/ProductsView/categories-types";

export const useProductsQuery = (): UseQueryResult<Category[]> => {
  const data = useQuery(["categories"], fetchCatalog, {
    staleTime: 60000,
  });
  return useMemo(() => data, [data]);
};
