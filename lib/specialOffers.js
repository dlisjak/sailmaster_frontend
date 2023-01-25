import axios from "axios";
import { BACKEND_URL } from "../constants/api";

export default function getSpecialOffers(lang) {
  return axios
    .get(BACKEND_URL + "special-offers", {
      params: {
        lang,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
