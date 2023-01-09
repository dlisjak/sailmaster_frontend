import axios from "axios";
import { BACKEND_URL } from "../constants/api";

export default class ApiContact {
  static contact(data) {
    return axios
      .post(BACKEND_URL + "contact", {
        ...data,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static partners(data) {
    return axios
      .post(BACKEND_URL + "partners", {
        ...data,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
