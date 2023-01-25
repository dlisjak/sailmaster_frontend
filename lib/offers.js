import axios from "axios";
import { BACKEND_URL } from "../constants/api";

export default class ApiOffers {
  static getFilteredOffers(data) {
    return axios
      .get(BACKEND_URL + "offers", {
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

  static getOffer(data) {
    return axios
      .get(BACKEND_URL + "offers/" + data.id, {
        params: {
          ...data,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return { error: true };
      });
  }

  static getWishList(data) {
    return axios
      .get(BACKEND_URL + "offers/wishlist", {
        params: {
          ...data,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((response) => {
        return response.data;
      });
  }

  static offersPagination(url) {
    return axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return { error: true };
      });
  }

  static getHomeOffers(data) {
    return axios
      .get(BACKEND_URL + "offers/home", {
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
