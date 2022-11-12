import { useCallback } from "react";
import { useAppDispatch } from "../redux/store";

import * as Form from "../redux/ducks/form-duck";
import { TOrder } from "../components/FormView/form-types";

export const useDispatchSubmitForm = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (action: TOrder) => {
      dispatch(Form.submitForm(action));
    },
    [dispatch]
  );
};

export const useDispatchClearForm = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch(Form.clearForm());
  }, [dispatch]);
};
