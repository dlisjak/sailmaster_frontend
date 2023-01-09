import { OFFERS_URL } from "../constants";
import { valuesToSearch } from "./search_utils";

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function searchUrl(values) {
  return OFFERS_URL + "?" + valuesToSearch(values)
}

export function offerUrl(yacht_id, yacht_model_name, pk) {
  return `${OFFERS_URL}/${yacht_id}-${convertToSlug(
    yacht_model_name
  )}/${pk}`;
}

export function offerLink(offer) {
  return offerUrl(offer.yacht.id, offer.yacht.yacht_model.name, offer.id)
}
