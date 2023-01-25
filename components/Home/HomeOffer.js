import React from "react";
import Link from "next/link";
import { Motion, spring } from "react-motion";
import { useTranslation } from "next-i18next";
import PinIcon from "../icons/PinIcon";
import PriceTag from "../icons/PriceTag";
import Yacht from "../icons/Yacht";
import Length from "../icons/Length";
import Wc from "../icons/Wc";
import Calendar from "../icons/Calendar";
import People from "../icons/People";
import formatMoney from "../common/utils/formatMoney";
import { getPrice, getDiscount } from "../common/utils/getPrices";

class HomeOffer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    };

    this.handleHover = this.handleHover.bind(this);
  }

  handleHover() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    // const discount = this.props.price !== this.props.price_list_price ? parseInt(100 - (this.props.price * 100.0 / this.props.price_list_price), 10) : 0;
    const { t } = useTranslation("common");
    const discount = getDiscount(
      this.props.price_list_price,
      this.props.price,
      this.props.discount
    );

    return (
      <Link
        to={this.props.link}
      >
        <Motion style={{ x: spring(this.state.hover ? 0 : 250) }}>
          {({ x }) => (
            <div
              className="home-offer"
              onMouseEnter={this.handleHover}
              onMouseLeave={this.handleHover}
            >
              {discount > 0 ? (
                <div className="discount-item">
                  <div>-{discount}%</div>
                </div>
              ) : (
                ""
              )}
              <div
                className="home-offer--image"
                style={{
                  backgroundImage: `url("${this.props.mainPicture}")`,
                  backgroundSize: "cover",
                }}
              />
              <div className="home-offer--body" style={{ top: `${x}px` }}>
                <div className="home-offer--name">
                  {this.props.model.replace("cab.", t("cab"))}{" "}
                  ({this.props.buildYear})
                </div>

                <div className="home-offer--destination">
                  <div className="home-offer--destination-icon">
                    <PinIcon />
                  </div>
                  <div className="home-offer--destination-text">
                    {this.props.marine}, {this.props.country}
                  </div>
                </div>

                <div className="home-offer--price">
                  <div className="home-offer--price-icon">
                    <PriceTag />
                  </div>

                  <div className="home-offer--price-price">
                    {discount > 0 ? (
                      <div className="home-offer--price-price-inner">
                        <div className="price-no-discount">
                          {formatMoney(this.props.price_list_price)} €
                        </div>
                        <div className="price-with-discount">
                          {formatMoney(
                            getPrice(
                              this.props.price_list_price,
                              this.props.price,
                              this.props.discount
                            )
                          )}{" "}
                          €
                        </div>
                      </div>
                    ) : (
                      <div className="price-with-discount">
                        {formatMoney(this.props.price)} €
                      </div>
                    )}
                  </div>
                </div>

                <div className="home-offer--others">
                  <ul>
                    {/*<li>
                      <div className="home-offer--others-icon">
                        <Model />
                      </div>
                      <div className="home-offer--others-text">
                        { this.props.model }
                      </div>
                    </li>*/}
                    <li>
                      <div className="home-offer--others-icon">
                        <Calendar />
                      </div>
                      <div className="home-offer--others-text">
                        {this.props.date}
                      </div>
                    </li>
                    <li>
                      <div className="home-offer--others-icon">
                        <Yacht />
                      </div>
                      <div className="home-offer--others-text">
                        {this.props.category}
                      </div>
                    </li>
                    <li>
                      <div className="home-offer--others-icon">
                        <People />
                      </div>
                      <div className="home-offer--others-text">
                        {this.props.cabins} / {this.props.berth}
                      </div>
                    </li>
                    <li>
                      <div className="home-offer--others-icon">
                        <Length />
                      </div>
                      <div className="home-offer--others-text">
                        {this.props.length}m
                      </div>
                    </li>
                    <li>
                      <div className="home-offer--others-icon">
                        <Wc />
                      </div>
                      <div className="home-offer--others-text">
                        {this.props.wc}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Motion>
      </Link>
    );
  }
}

export default HomeOffer;
