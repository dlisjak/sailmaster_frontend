import { browserHistory } from "react-router-dom";

export default function generateQueryString(data) {
  let formBody = [];

  for (let property in data) {
    const encodedKey = property;
    const encodedValue = data[property];
    formBody.push(encodedKey + "=" + encodedValue);
  }

  browserHistory.push(
    browserHistory.getCurrentLocation().pathname + "?" + formBody.join("&")
  );
}
