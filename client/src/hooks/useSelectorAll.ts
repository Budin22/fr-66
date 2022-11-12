import { useMemo } from "react";
import { RootState, useAppSelector } from "../redux/store";

const selectorAll = (state: RootState) => state;

export const useSelectorAll = (): RootState => {
  const { cart, form, user } = useAppSelector(selectorAll);
  return useMemo(
    () => ({
      cart,
      form,
      user,
    }),
    [cart, form, user]
  );
};
