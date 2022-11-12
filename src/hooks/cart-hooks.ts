import { useCallback } from "react";
import { useAppDispatch } from "../redux/store";

import * as Cart from "../redux/ducks/cart-duck";
import { useSelectorAll } from "./useSelectorAll";
import {
  TChangeNumberAction,
  TInitialS,
  TInitialState,
  TRemoveProductAction,
} from "../redux/ducks/cart-types";

export const useDispatchAddProduct = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (action: TInitialState) => {
      dispatch(Cart.addProduct(action));
    },
    [dispatch]
  );
};

export const useDispatchAddAllProduct = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (action: TInitialS) => {
      dispatch(Cart.addAllProduct(action));
    },
    [dispatch]
  );
};

export const useDispatchRemoveProduct = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (action: TRemoveProductAction) => {
      dispatch(Cart.removeProduct(action));
    },
    [dispatch]
  );
};

export const useDispatchChangeNumberProduct = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (action: TChangeNumberAction) => {
      dispatch(Cart.changeNumberProduct(action));
    },
    [dispatch]
  );
};

export const useDispatchRemoveAllProducts = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch(Cart.removeAllProducts());
  }, [dispatch]);
};

export const useIsInCart = () => {
  const { cart } = useSelectorAll();
  return useCallback(
    (id: string) => cart.order?.find((item): boolean => item.id === id),
    [cart]
  );
};
