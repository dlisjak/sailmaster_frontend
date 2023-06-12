import qs from "qs";
import { fromIsoDate, toIsoDate } from "./formats";
import moment from "moment";

const QS_OPTS = { arrayFormat: "repeat" };
export const CABINS_TOTAL_MAX = 8;

export function maxValueBuildYear() {
  const currentYear = parseInt(moment().format("YYYY"), 10);
  return parseInt(moment().format("MM"), 10) >= 7
    ? currentYear + 1
    : currentYear;
}

export function getValue(value) {
  return typeof value === "function" ? value() : value;
}

const RANGE_FIELDS = [
  "yacht__cabins_total",
  "yacht__build_year",
  "client_price",
  "yacht__yacht_model__loa",
  "yacht__wc",
];
export const RANGE_FIELDS_MAX = {
  yacht__cabins_total: CABINS_TOTAL_MAX,
  yacht__build_year: maxValueBuildYear,
  client_price: 15000,
  yacht__yacht_model__loa: 20,
  yacht__wc: 4,
};
export const RANGE_FIELDS_MIN = {
  yacht__build_year: 1980,
  client_price: 1,
};

const DEFAULT_FIELDS = [
  "o",
  "yacht__yacht_model__category__yachtdisplaycategory",
  "yacht__yacht_model__builder",
  "yacht__yacht_model__parent",
];
const SET_FIELDS = ["equipment"];

export const rangeToParams = (
  name,
  data,
  max_default = null,
  min_default = 0
) => {
  if (!data[name]) {
    return null;
  }
  const value = {};
  const { min, max } = data[name];
  if (min !== getValue(min_default)) {
    value[`${name}__gte`] = String(min);
  }
  if (max !== getValue(max_default)) {
    value[`${name}__lte`] = String(max);
  }
  return value;
};

export const paramsToRange = (
  name,
  data,
  max_default = null,
  min_default = null
) => {
  return {
    min: Number(data[`${name}__gte`] || min_default || 0),
    max: Number(data[`${name}__lte`] || getValue(max_default)),
  };
};

export const paramToSet = (value) => {
  let v = value || [];
  if (typeof v === "string") {
    v = [v];
  }
  return new Set(v);
};

export const valuesToSearch = (data) => {
  const destinations = (data.destinations || []).map((e) =>
    [e.obj_type, e.value, e.label].join("-")
  );
  const params = {
    destinations,
  };
  if (data.dateRange && data.dateRange.startDate) {
    params.period_from = toIsoDate(data.dateRange.startDate);
  }
  if (data.dateRange && data.dateRange.endDate) {
    params.period_to = toIsoDate(data.dateRange.endDate);
  }
  SET_FIELDS.forEach((fieldName) => {
    params[fieldName] = [...(data[fieldName] || [])];
  });
  RANGE_FIELDS.forEach((fieldName) =>
    Object.assign(
      params,
      rangeToParams(
        fieldName,
        data,
        RANGE_FIELDS_MAX[fieldName],
        RANGE_FIELDS_MIN[fieldName]
      )
    )
  );
  DEFAULT_FIELDS.forEach((fieldName) => {
    if (data[fieldName]) {
      params[fieldName] = data[fieldName];
    }
  });
  return qs.stringify(params, QS_OPTS);
};

export const parseDestinations = (destinations) => {
  if (!destinations) {
    return null;
  }
  if (typeof destinations === "string") {
    destinations = [destinations];
  }
  return destinations.map((item) => {
    const [obj_type, value, label] = item.split("-");
    return { obj_type, value, label };
  });
};

export const getValuesFromUrl = (search) => {
  const values = {};
  const data = qs.parse(search.replace("?", ""), QS_OPTS);

  values.destinations = parseDestinations(data.destinations);

  SET_FIELDS.forEach((fieldName) => {
    values[fieldName] = paramToSet(data[fieldName]);
  });
  RANGE_FIELDS.forEach(
    (fieldName) =>
    (values[fieldName] = paramsToRange(
      fieldName,
      data,
      RANGE_FIELDS_MAX[fieldName],
      RANGE_FIELDS_MIN[fieldName]
    ))
  );
  DEFAULT_FIELDS.forEach((fieldName) => (values[fieldName] = data[fieldName]));

  values.dateRange = {
    startDate: fromIsoDate(data.period_from),
    endDate: fromIsoDate(data.period_to),
  };

  return values;
};
