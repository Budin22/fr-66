export type TInitialState = {
    id: string;
    number: number;
    photo: string;
    title: string;
    price: string;
};

export type TInitialS = {
    date: string;
    order: Array<TInitialState>;
};

export type TChangeNumberAction = {
    index: number;
    number: number;
};

export type TRemoveProductAction = {
    index: number;
};