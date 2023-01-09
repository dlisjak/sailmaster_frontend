import moment from "moment";
import formatMoney from "components/common/utils/formatMoney";

export function formatLength(value, defaultValue = "/") {
  return value || value === 0 ? `${value}m` : defaultValue;
}

export function formatVolume(value, defaultValue = "/") {
  return value ? `${value} l` : defaultValue;
}

export function formatPower(value, defaultValue = "/") {
  return value ? `${value} HP` : defaultValue;
}

export const formatMoneyAmount = (value) => `${formatMoney(value)} €`;

// date functions

export const formatDate = (value) => moment(value).format("DD.MM.YYYY");

export const formatDateLong = (value) =>
  moment(value).format("dddd, D. MMMM YYYY");

export const formatPeriod = (period_from, period_to) =>
  `${formatDate(period_from)} - ${formatDate(period_to)}`;

export const diffDays = (v1, v2) => moment(v1).diff(moment(v2), "days");

export const toIsoDate = (value) => {
  return value ? value.toISOString(true).slice(0, 10) : undefined;
};

export const fromIsoDate = (value) => {
  return value ? moment(value) : null;
};

// string functions

// joinPlus(1, 2) # 1+2
// joinPlus(1, null) # 1
export const joinPlus = (...args) => {
  return args.filter(Boolean).join("+");
};

// suffix(1, " x ") // 1 x
// suffix(0, " x ") //
export const suffix = (val, label) => {
  return val ? `${val}${label}` : "";
};
