const Rating = ({ rating }) => {
  return (
    <>
      {Array.from(Array(rating).keys()).map((e, index) => (
        <span key={`star-${index}`}>★</span>
      ))}
    </>
  );
};

export default Rating
