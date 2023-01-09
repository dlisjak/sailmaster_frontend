export const Flag = ({ code }) => {
  if (!code) {
    return null;
  }
  return <span className={`fi fi-${code.toLowerCase()}`}></span>;
};

const Location = ({ location, onLocationClick }) => {
  return (
    <div className="location">
      <Flag code={location.country_iso_code} />{" "}
      <a href="#!" onClick={onLocationClick} className="location__name">{location.name}</a>
      <span className="location__region">, {location.region_name}</span>
      <span className="location__country">, {location.country_name}</span>
    </div>
  );
};

export default Location
