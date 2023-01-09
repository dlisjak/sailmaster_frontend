import {
  WISHLIST_CLICKED,
  WISHLIST_API_SAGA,
  WISHLIST_API,
} from "../constants/actionTypes";

export function wishlistClickedReducerAction(payload) {
  return { type: WISHLIST_CLICKED, payload };
}

export function wishlistApiReducerAction(payload) {
  return { type: WISHLIST_API, payload };
}

export function wishlistApiSagaAction(payload) {
  return { type: WISHLIST_API_SAGA, payload };
}
