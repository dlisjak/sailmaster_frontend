import React from "react";
import chunk from "lodash/chunk";
import range from "lodash/range";

import Col from "react-bootstrap/Col";

export const Property = ({ name, value }) => (
  <>
    <div className="property-label">{name}</div>
    <div className="property-value">{value}</div>
  </>
);

const Properties = ({ items, size = 2 }) => (
  <div className="properties">
    {chunk(items, size).map((rows, rowIndex) => (
      <div className="row" key={rowIndex}>
        {range(size).map((index) => {
          const property = rows[index];
          if (!property) {
            return <Col key={index} />;
          }
          return <Col key={index}><Property {...property} /></Col>;
        })}
      </div>
    ))}
  </div>
);

export default Properties;
