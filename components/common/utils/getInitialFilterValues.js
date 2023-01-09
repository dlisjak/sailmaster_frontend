import moment from "moment";
import { getDate } from "./getDate";

export function getInitialFilterValues(_filter) {
  const filter = JSON.parse(JSON.stringify(_filter));

  if (filter.startDate) {
    filter.startDate = moment(filter.startDate);
  } else {
    filter.startDate = getDate(true);
  }

  if (filter.endDate) {
    filter.endDate = moment(filter.endDate);
  } else {
    filter.endDate = getDate(false);
  }

  let returnValue = {
    home_search: filter,
    startDate: filter.startDate,
    endDate: filter.endDate,
  };

  return returnValue;
}

export function getInitialSideMenuFilterValues(_filter) {
  const filter = JSON.parse(JSON.stringify(_filter));

  if (filter.startDate) {
    filter.startDate = moment(filter.startDate);
  } else {
    filter.startDate = getDate(true);
  }

  if (filter.endDate) {
    filter.endDate = moment(filter.endDate);
  } else {
    filter.endDate = getDate(false);
  }

  let returnValue = {
    home_search: filter,
    startDate: filter.startDate,
    endDate: filter.endDate,
  };

  if (filter.yacht__build_year__gte || filter.yacht__build_year__lte) {
    let buildYearFrom = 1980;
    let buildYearTo = parseInt(moment().format("YYYY"), 10);

    if (filter.yacht__build_year__gte) {
      buildYearFrom = parseInt(filter.yacht__build_year__gte, 10);
    }

    if (filter.yacht__build_year__lte) {
      buildYearTo = parseInt(filter.yacht__build_year__lte, 10);
    }

    returnValue["buildYear"] = {
      min: buildYearFrom,
      max: buildYearTo,
    };
  }

  if (filter.yacht__build_year__gte || filter.yacht__build_year__lte) {
    let priceFrom = 1;
    let priceTo = 10000;

    if (filter.client_price__gte) {
      priceFrom = parseInt(filter.client_price__gte, 10);
    }

    if (filter.client_price__lte && filter.client_price__lte !== "undefined") {
      priceTo = parseInt(filter.client_price__lte, 10);
    }

    returnValue["price"] = {
      min: priceFrom,
      max: priceTo,
    };
  }

  returnValue.yachtCabinsRange = {
    min: parseInt(filter.yacht__cabins_total__gte, 10) || 0,
    max: parseInt(filter.yacht__cabins_total__lte, 10) || 8,
  };

  if (filter.ordering) {
    returnValue["yachtOrdering"] = filter.ordering;
  }

  return returnValue;
}
