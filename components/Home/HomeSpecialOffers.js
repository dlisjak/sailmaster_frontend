import React from "react";

const HomeSpecialOffers = ({ specialOffers }) => {
  if (specialOffers.length === 0) {
    return null;
  }
  const specialOffer = specialOffers[0];
  const img = specialOffer.image_frontpage;
  const wrapperStyle = {};
  if (specialOffer.style) {
    wrapperStyle.boxShadow = `0px 0px 8px ${specialOffer.style}`;
  }
  return (
    <div className="container page-home__block">
      <div className="row">
        <div className="col-sm-12">
          <div className="home-special-offers" style={wrapperStyle}>
            {img && (
              <div className="home-special-offers__img">
                <a href={specialOffer.url}>
                  <img alt={specialOffer.title} src={img} />
                </a>
              </div>
            )}
            <div className="home-special-offers__content">
              <div className="home-special-offers__title">
                <a href={specialOffer.url}>{specialOffer.title}</a>
              </div>
              <div dangerouslySetInnerHTML={{ __html: specialOffer.text }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSpecialOffers;
