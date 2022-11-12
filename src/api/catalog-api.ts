import axios from "axios";
import { fetchLinks } from "./fetch-links";

export const fetchCatalog = async () => {
    return await axios
        .get(fetchLinks.categories)
        .then((res) => res.data)
        .catch((err) => {
            throw Error(err.massage);
        });
};
