import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// нееет, никаких постфиксов!
// если очень хочется - только префиксы по типу IState
// но тут интерфейсы даже не нужны, тут достаточно type alias - type TState = {...}
export interface InitialStateI {
  id: string;
  number: number;
  photo: string;
  title: string;
  price: string;
}

// change что? из типа экшена не очевидно, что change amount
export interface ChangeActionI {
  index: number;
  number: number;
}

export interface RemoveActionI {
  index: number;
}

// just "namespace"
const cartNamespace = "cart" as const;

// если у тебя в стейте массив добавленных продуктов - надо тип стейта оаписать примерно как
// type TState = Array<{...}>
// а еще лучше - сделать отдельный тип для продукта и использовать его везде
const initialState: InitialStateI[] = [];

export const {
  actions: {
    addProduct,
    removeProduct,
    changeNumberProduct,
    removeAllProducts,
    addProductsList,
  },
  reducer,
} = createSlice({
  name: cartNamespace,
  initialState,
  reducers: {
    addProductsList(state, action: PayloadAction<InitialStateI[]>) {
      return action.payload;
    },
    addProduct(state, action: PayloadAction<InitialStateI>) {
      state.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<RemoveActionI>) {
      state.splice(action.payload.index, 1);
    },
    changeNumberProduct(state, action: PayloadAction<ChangeActionI>) {
      state[action.payload.index].number = action.payload.number;
    },
    removeAllProducts(state) {
      state.length = 0;
    },
  },
});
