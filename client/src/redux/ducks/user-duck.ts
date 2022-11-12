import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLocalStorage } from "../../services/setLocalStorege";
import {
  TInitialS,
  TOrders,
  TRemoveUser,
  TSingInUser,
  TUser,
} from "./user-types";

const namespace = "user" as const;

const defaultUser: TUser = {
  id: "",
  email: "",
  password: "",
  orders: [],
};

export const initialState: TInitialS = {
  activeUser: defaultUser,
  users: [],
};

export const {
  actions: {
    addUser,
    removeUser,
    addUserOrder,
    signInUser,
    addAllUsers,
    logOutUser,
  },
  reducer,
} = createSlice({
  name: namespace,
  initialState,
  reducers: {
    addAllUsers(state, action: PayloadAction<TInitialS>) {
      return action.payload;
    },
    signInUser(state, action: PayloadAction<TSingInUser>) {
      const user = state.users.find(
        (item) =>
          item.password === action.payload.password &&
          item.email === action.payload.email
      );
      if (user !== undefined) {
        state.activeUser = user;
        setLocalStorage(namespace, state);
      } else {
        alert("You write uncorrected email or password");
      }
    },
    addUser(state, action: PayloadAction<TUser>) {
      const user = state.users.find(
        (item) => item.email === action.payload.email
      );

      if (user === undefined) {
        state.users.push(action.payload);
        state.activeUser = action.payload;
        setLocalStorage(namespace, state);
      } else {
        alert(`User with email: ${action.payload.email} is exist`);
      }
    },
    removeUser(state, action: PayloadAction<TRemoveUser>) {
      state.activeUser = defaultUser;
      state.users = state.users.filter((item) => item.id !== action.payload.id);
      setLocalStorage(namespace, state);
    },
    logOutUser(state) {
      state.activeUser = defaultUser;
      setLocalStorage(namespace, state);
    },
    addUserOrder(state, action: PayloadAction<TOrders>) {
      const index = state.users.findIndex(
        (item) => item.id === state.activeUser.id
      );
      state.users[index].orders.push(action.payload);
      state.activeUser.orders.push(action.payload);
      setLocalStorage(namespace, state);
    },
  },
});
