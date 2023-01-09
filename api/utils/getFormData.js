export default function getFormData(data) {
  let formBody = [];

  for (let property in data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue;
    if (typeof data[property] === "object") {
      data[property].forEach((location) => {
        encodedValue = encodeURIComponent(location);
        formBody.push(encodedKey + "[]=" + encodedValue);
      });
    } else {
      encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
  }
  return formBody.join("&");
}
