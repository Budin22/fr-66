import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { useCallback, useMemo } from "react";
import {
  addProduct,
  addProductsList,
  TChangeNumberAction,
  changeNumberProduct,
  TRemoveProductAction,
  removeAllProducts,
  removeProduct, TInitialS, TInitialState,
} from "../redux/ducks/cart-duck";
import { TOrder } from "../components/FormView/form-types";
import { clearForm, submitForm } from "../redux/ducks/form-duck";

export const useDispatchAddProductsList = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (action: TInitialS) => {
      dispatch(addProductsList(action));
    },
    [dispatch]
  );
};

export const useDispatchAddProduct = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (action: TInitialState) => {
      dispatch(addProduct(action));
    },
    [dispatch]
  );
};

export const useDispatchRemoveProductsList = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (action: TRemoveProductAction) => {
      dispatch(removeProduct(action));
    },
    [dispatch]
  );
};

export const useDispatchChangeNumberProduct = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (action: TChangeNumberAction) => {
      dispatch(changeNumberProduct(action));
    },
    [dispatch]
  );
};

export const useDispatchRemoveAllProducts = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch(removeAllProducts());
  }, [dispatch]);
};

const selectorAll = (state: RootState) => state;

export const useSelectorAll = (): RootState => {
  const { cart, form } = useAppSelector(selectorAll);
  return useMemo(
    () => ({
      cart,
      form,
    }),
    [cart, form]
  );
};

export const useSelectorCartTotalPrice = (): number => {
  const { cart } = useAppSelector(selectorAll);
  return useMemo(
    () => cart.reduce((a, b) => a + parseInt(b.price) * b.number, 0),
    [cart]
  );
};

export const useDispatchSubmitForm = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (action: TOrder) => {
      dispatch(submitForm(action));
    },
    [dispatch]
  );
};

export const useDispatchClearForm = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch(clearForm());
  }, [dispatch]);
};

export const useIsInCart = () => {
  const { cart } = useSelectorAll();
  return useCallback(
    (id: string) => cart.find((item): boolean => item.id === id),
    [cart]
  );
};
