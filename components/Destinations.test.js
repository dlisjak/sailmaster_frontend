import React from "react";
import renderer from "react-test-renderer";

import Destinations from "./Destinations";
import { destinations2 } from "tests/fixtures";
import { wrapRouter } from "utils/testUtils";

test("renders correctly", () => {
  const tree = renderer
    .create(wrapRouter(<Destinations items={destinations2} />))
    .toJSON();
  expect(tree).toMatchSnapshot();
});
