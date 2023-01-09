import axios from "axios";
import { BACKEND_URL } from "../constants/api";

export default class ApiBlog {
  static getBlogs(data) {
    return axios
      .get(BACKEND_URL + "blog", {
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

  static getBlog(slug) {
    return axios
      .get(`${BACKEND_URL}blog/slug/${slug}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return { error: true };
      });
  }

  static blogPagination(url) {
    return axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return { error: true };
      });
  }
}
