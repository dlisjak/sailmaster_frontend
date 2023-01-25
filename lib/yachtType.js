import axios from "axios";
import { BACKEND_URL } from "../constants/api";

export default class ApiYachtType {
  static getList(lang) {

    return axios
      .get(BACKEND_URL + "yacht_display_categories", {
        params: {
          lang: lang,
        },
      })
      .then((response) => {
        return response.data.map(item => ({value: item.id, label: item.name.name}))
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
