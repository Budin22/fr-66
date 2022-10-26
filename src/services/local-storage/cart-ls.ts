import {
  ChangeActionI,
  InitialStateI,
  RemoveActionI,
} from "../../redux/ducks/cart-duck";

const cart = "Cart" as const;

export const addProductLS = (action: InitialStateI) => {
  const cartData = localStorage.getItem(cart);
  if (cartData) {
    const data: InitialStateI[] = JSON.parse(cartData);
    data.push(action);
    localStorage.setItem(cart, JSON.stringify(data));
  } else {
    const data: InitialStateI[] = [action];
    localStorage.setItem(cart, JSON.stringify(data));
  }
};

export const removeProductLS = (action: RemoveActionI) => {
  const cartData = localStorage.getItem(cart);
  if (cartData !== null) {
    const data: InitialStateI[] = JSON.parse(cartData);
    data.splice(action.index, 1);
    data.length
      ? localStorage.setItem(cart, JSON.stringify(data))
      : localStorage.removeItem(cart);
  }
};

export const changeNumberProductLS = (action: ChangeActionI) => {
  const cartData = localStorage.getItem(cart);
  if (cartData !== null) {
    const data: InitialStateI[] = JSON.parse(cartData);
    data[action.index].number = action.number;
    localStorage.setItem(cart, JSON.stringify(data));
  }
};

export const removeAllProductLS = () => {
  localStorage.removeItem(cart);
};
