import moment from "moment";

export default function getDateFormat(date) {
  if (typeof date !== "string") {
    return date.format("YYYY-MM-DD");
  }

  return moment(date).format("YYYY-MM-DD");
}
