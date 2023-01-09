import moment from "moment";

export function getDate(startDate) {
  if (startDate) {
    if (moment().weekday() === 5) {
      return moment().add(7, "days");
    } else if (moment().weekday() === 6) {
      return moment().add(6, "days");
    } else {
      return moment().startOf("week").add(5, "days");
    }
  }

  if (moment().weekday() === 5) {
    return moment().add(7, "days").add(7, "days");
  } else if (moment().weekday() === 6) {
    return moment().add(6, "days").add(7, "days");
  } else {
    return moment().startOf("week").add(5, "days").add(7, "days");
  }
}
