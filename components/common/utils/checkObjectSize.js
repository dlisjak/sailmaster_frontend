export default function checkObjectSize(data) {
  let formBody = [];

  for (let property in data) {
    const encodedKey = property;
    const encodedValue = data[property];
    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.length > 0 ? true : false;
}
