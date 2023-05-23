import { OFFERS_URL } from "../constants/urls";
import { valuesToSearch } from "./search_utils";

function convertToSlug(Text) {
  return Text?.toLowerCase()
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

export const boatLink = (yachtId, yachtModelName) => {
  return `${OFFERS_URL}/${yachtSlug(yachtId, yachtModelName)}`;
}

export function offerLink(offer) {
  if (!offer) return;
  return offerUrl(offer.yacht?.id, offer.yacht?.yacht_model.name, offer.id);
}

export function yachtSlug(yacht_id, yacht_model_name) {
  return `${yacht_id}-${convertToSlug(
    yacht_model_name
  )}`;
}
export function yachtLink(offer) {
  return yachtSlug(offer.yacht.id, offer.yacht.yacht_model.name)
}
