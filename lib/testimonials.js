import axios from "axios";
import { BACKEND_URL } from "../constants/api";

export default class ApiTestimonials {
  static getTestimonials(data) {
    return axios
      .get(BACKEND_URL + "testimonials", {
        params: {
          ...data,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
