import {getDiscount} from './getPrices'

describe("getDiscount", () => {
  test("default", () => {
    expect(getDiscount(100, 90, 10)).toBe(19)
  })
})
