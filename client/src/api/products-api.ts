import axios from "axios";
import { fetchLinks } from "./fetch-links";

export const fetchProduct = async () => {
  return await axios
    .get(fetchLinks.products)
    .then((res) => res.data)
    .catch((err) => {
      throw Error(err.massage);
    });
};
