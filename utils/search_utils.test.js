import {
  valuesToSearch,
  getValuesFromUrl,
  rangeToParams,
  paramsToRange,
  paramToSet,
} from "./search_utils";
import { destinations } from "../tests/fixtures";
import moment from "moment";

describe("range conversions", function () {
  const params = {
    yacht__cabins_total__gte: "2",
    yacht__cabins_total__lte: "4",
  };
  const data = {
    yacht__cabins_total: {
      min: 2,
      max: 4,
    },
  };
  test("rangeToParams", () => {
    expect(rangeToParams("yacht__cabins_total", data)).toEqual(params);
  });
  test("paramsToRange", () => {
    expect(paramsToRange("yacht__cabins_total", params)).toEqual({
      min: 2,
      max: 4,
    });
  });
});

describe("valuesToSearch", function () {
  test("destinations", () => {
    expect(valuesToSearch({ destinations })).toEqual(
      "destinations=city-pula-pula&destinations=region-istra-istra&destinations=country-croatia-croatia"
    );
  });

  test("period", () => {
    expect(
      valuesToSearch({
        dateRange: {
          startDate: moment("2030-01-01"),
          endDate: moment("2030-01-01"),
        },
      })
    ).toEqual("period_from=2030-01-01&period_to=2030-01-01");
  });

  test("order", () => {
    expect(
      valuesToSearch({
        o: "price",
      })
    ).toEqual("o=price");
  });
});

describe("getValuesFromUrl", function () {
  test("period", () => {
    expect(
      getValuesFromUrl("period_from=2030-01-01&period_to=2030-01-01").dateRange
    ).toEqual({
      startDate: moment("2030-01-01"),
      endDate: moment("2030-01-01"),
    });
  });

  test("period empty", () => {
    expect(getValuesFromUrl("").dateRange).toEqual({
      startDate: null,
      endDate: null,
    });
  });

  test("yacht__build_year min, max", () => {
    const value = getValuesFromUrl("").yacht__build_year;
    expect(value.min).toEqual(1980);
    expect(value.max).toBeGreaterThan(2020);
  });
});


describe("paramToSet", function() {
  test("string", () => {
    expect(paramToSet("100")).toEqual(new Set(["100"]))
  })
  test("array", () => {
    expect(paramToSet(["100", "200"])).toEqual(new Set(["100", "200"]))
  })
})
