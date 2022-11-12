export type TOrderItem = {
  id: string;
  number: number;
  photo: string;
  title: string;
  price: string;
};

export type TOrders = {
  date: string;
  order: Array<TOrderItem>;
};

export type TUser = {
  id: string;
  email: string;
  password: string;
  orders: Array<TOrders>;
};

export type TSingInUser = {
  email: string;
  password: string;
};

export type TInitialS = {
  activeUser: TUser;
  users: Array<TUser>;
};

export type TRemoveUser = {
  id: string;
};
