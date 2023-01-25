import axios from "axios";
import { BACKEND_URL } from "../constants/api";

export default class ApiLocations {

  static getCountriesEnquiry(payload) {
    return axios
      .get(BACKEND_URL + "countries_enquiry", {
        params: {
          ...payload,
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
