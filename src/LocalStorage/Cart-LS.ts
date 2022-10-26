import {
  changeActionI,
  initialStateI,
  removeActionI,
} from "../redux/cart-duck";

const cart: "Cart" = "Cart";

export const addProductLS = (action: initialStateI) => {
  const cartData = localStorage.getItem(cart);
  if (cartData) {
    const data: initialStateI[] = JSON.parse(cartData);
    data.push(action);
    localStorage.setItem(cart, JSON.stringify(data));
  } else {
    const data: initialStateI[] = [action];
    localStorage.setItem(cart, JSON.stringify(data));
  }
};

export const removeProductLS = (action: removeActionI) => {
  const cartData = localStorage.getItem(cart);
  if (cartData !== null) {
    const data: initialStateI[] = JSON.parse(cartData);
    data.splice(action.index, 1);
    data.length
      ? localStorage.setItem(cart, JSON.stringify(data))
      : localStorage.removeItem(cart);
  }
};

export const changeNumberProductLS = (action: changeActionI) => {
  const cartData = localStorage.getItem(cart);
  if (cartData !== null) {
    const data: initialStateI[] = JSON.parse(cartData);
    data[action.index].number = action.number;
    localStorage.setItem(cart, JSON.stringify(data));
  }
};

export const removeAllProductLS = () => {
  localStorage.removeItem(cart);
};
