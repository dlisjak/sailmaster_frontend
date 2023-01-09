import axios from "axios";
import { BACKEND_URL } from "../constants/api";

export default class ApiEnquiry {
  static enquiry(data) {
    return axios
      .post(BACKEND_URL + "offers/" + data.id + "/enquiry", {
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
