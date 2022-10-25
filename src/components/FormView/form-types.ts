export type CountryT = "Ukraine" | "Finland" | "Poland" | "";
export type DeliveryT = "By wolfs" | "By rabbit" | "By duck" | "";

export interface InputsI {
  firstName: string;
  lastName: string;
  country: CountryT;
  city: string;
  delivery: DeliveryT;
  email: string;
  phone: string;
  address: string;
  address2: string;
  textarea: string;
  checkbox: boolean;
}
