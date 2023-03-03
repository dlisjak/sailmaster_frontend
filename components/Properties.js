import chunk from "lodash/chunk";
import range from "lodash/range";

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
            return <div className="relative flex-grow max-w-full flex-1 px-[5px]" key={index} />;
          }
          return <div className="relative flex-grow max-w-full flex-1 px-[5px]" key={index}><Property {...property} /></div>;
        })}
      </div>
    ))}
  </div>
);

export default Properties;
