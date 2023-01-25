import axios from "axios";
import { BACKEND_URL } from "../constants/api";

export default class ApiNewsletter {
  static addNewsletter(data) {
    return axios
      .post(BACKEND_URL + "newsletter", {
        ...data,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static addNewsletterGift(data) {
    return axios
      .post(
        BACKEND_URL + "newsletter-gift",
        // for debug
        //'https://httpstat.us/200',
        {
          ...data,
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
