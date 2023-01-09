import axios from "axios";
import { BACKEND_URL, BACKEND_URL2 } from "../constants/api";

export default async function getData(url, params = null) {
  return await axios
    .get(url, {
      params,
    })
    .then((response) => {
      return response.data;
    });
}

export async function postData(url, data) {
  return await axios.post(url, data).then((response) => {
    return response.data;
  });
}

export const getHomeOffers = async () =>
  await getData(BACKEND_URL + "offers/home/");

export const getHomeBlogs = async (lang, limit) =>
  await getData(BACKEND_URL + "blog/", { lang, limit: 3 });

export const getBlog = async (slug) =>
  await getData(BACKEND_URL + "blog/", { slug });

export const getTestimonials = async (lang, limit = 4) =>
  await getData(BACKEND_URL + "testimonials/", { lang, limit });

export const subscribeNewsletter = async (data) =>
  await postData(BACKEND_URL + "newsletter/", data);

export const subscribeNewsletterGift = async (data) =>
  await postData(BACKEND_URL + "newsletter-gift/", data);

export const createInquiry = async (data) =>
  await postData(BACKEND_URL2 + "inquiry/", data);


export const createOfferInquiry = async (data) =>
  await postData(BACKEND_URL + "offers/" + data.id + "/enquiry", data)

export const createContact = async (data) =>
  await postData(BACKEND_URL + "contact/", data)

export const createPartner = async (data) =>
  await postData(BACKEND_URL + "partners/", data)

export const getFeaturedYachts = async (lang) => {
  const response = await axios.get(BACKEND_URL + "featured-yachts/", {
    params: {
      lang,
    }
  });
  return response.data;
};

