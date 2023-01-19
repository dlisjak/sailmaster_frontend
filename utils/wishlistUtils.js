import { fromJS, List } from "immutable";

export function handleHeartClick(id) {
  let arr = List();
  let jsArray = [];

  if (localStorage.getItem("wishlist")) {
    arr = fromJS(localStorage.getItem("wishlist").split(","));
    if (arr.contains(id.toString())) {
      arr = arr.filterNot((x) => id.toString() === x);
    } else {
      arr = arr.push(id.toString());
    }
    jsArray = arr.toJS();
    localStorage.setItem("wishlist", jsArray.toString());
  } else {
    arr = arr.push(id.toString());
    jsArray = arr.toJS();
    localStorage.setItem("wishlist", jsArray.toString());
  }
  return {
    count: jsArray.length,
    array: arr,
  };
}

export const getWishlistFromLocalStorage = () => {
  let arr = List();

  const wishlist = localStorage.getItem("wishlist");
  if (wishlist) {
    arr = fromJS(localStorage.getItem("wishlist").split(","));
  }

  return arr;
};
