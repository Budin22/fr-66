import { useCallback } from "react";
import { useAppDispatch } from "../redux/store";

import * as User from "../redux/ducks/user-duck";
import {
  TInitialS,
  TOrders,
  TRemoveUser,
  TSingInUser,
  TUser,
} from "../redux/ducks/user-types";

export const useDispatchAddAllUsers = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (action: TInitialS) => {
      dispatch(User.addAllUsers(action));
    },
    [dispatch]
  );
};

export const useDispatchAddUser = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (action: TUser) => {
      dispatch(User.addUser(action));
    },
    [dispatch]
  );
};

export const useDispatchRemoveUser = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (action: TRemoveUser) => {
      dispatch(User.removeUser(action));
    },
    [dispatch]
  );
};

export const useDispatchAddUserOrder = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (action: TOrders) => {
      dispatch(User.addUserOrder(action));
    },
    [dispatch]
  );
};

export const useDispatchSignInUser = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (action: TSingInUser) => {
      dispatch(User.signInUser(action));
    },
    [dispatch]
  );
};

export const useDispatchLogOutUser = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    dispatch(User.logOutUser());
  }, [dispatch]);
};
