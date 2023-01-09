import axios from "axios";
import { BACKEND_URL } from "../constants/api";

export default class ApiBrands {
  static brands(lang) {
    return axios
      .get(BACKEND_URL + "yacht_builders")
      .then((response) => {
        return response.data.map(item => ({value: item.id, label: item.name}))
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
