export function getCabinsText(cabinsNo, t) {
  if (cabinsNo === 1) {
    return t("berth_one");
  } else if (cabinsNo === 2) {
    return t("berth_two");
  } else {
    return t("berth_more");
  }
}

export function getBerthText(berthNo, t) {
  if (berthNo === 1) {
    return t("people_one");
  } else if (berthNo === 2) {
    return t("people_two");
  } else {
    return t("people_more");
  }
}
