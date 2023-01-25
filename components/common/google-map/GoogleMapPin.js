import ReactDOM from "react-dom";
import { browserHistory } from "react-router-dom";
import { useTranslation } from "next-i18next";

import { getInitialFilterValues } from "../utils/getInitialFilterValues";
import getDateFormat from "../utils/getDateFormat";
import Close from "../../icons/Close";

class GoogleMapPin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    // Bind functions
    this.onPinClick = this.onPinClick.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  componentDidMount() {
    // Add event listener which we use to check if user click outside profile dropdown
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  componentWillUnmount() {
    // Add event listener which we use to check if user click outside profile dropdown
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  // Handle outside click
  handleClickOutside(event) {
    const domNode = ReactDOM.findDOMNode(this.refs.googleMapPin);

    if (!domNode || !domNode.contains(event.target)) {
      if (this.refs.googleMapPin) {
        this.setState({
          open: false,
        });
      }
    }
  }

  onPinClick() {
    // If method onClick exists in props then pin is cluster,
    // otherwise is the normal pin.
    if (this.props.onClick) {
      this.props.onClick();
    } else {
      this.setState({ open: true });
    }
  }

  setFilter() {
    const filter = getInitialFilterValues(this.props.filter).home_search;

    filter["destination"] = "l-" + this.props.location.id.toString();
    filter["destinationString"] = this.props.location.name.name;

    if (filter.startDate) {
      filter.startDate = getDateFormat(filter.startDate);
    }

    if (filter.endDate) {
      filter.endDate = getDateFormat(filter.endDate);
    }

    filter.lang = this.props.i18n.language;

    browserHistory.push({
      pathname: t("offers_route"),
      search: `?destination=${filter["destination"]}&destinationString=${filter["destinationString"]}`,
    });
  }

  // Render method
  render() {
    const { t } = useTranslation("common");

    return (
      <div ref="googleMapPin">
        {this.state.open && this.props.location ? (
          <div className="google-map-open">
            <div onClick={() => this.setState({ open: false })}>
              <Close />
            </div>
            <div className="marine-name">
              <h3>{this.props.location.name.name}</h3>
            </div>
            {this.props.location.image ? (
              <div className="marine-img">
                <img
                  src={this.props.location.image.thumbnail}
                  className="img-fluid"
                />
              </div>
            ) : (
              <div />
            )}
            <div className="marine-button">
              <button
                type="button"
                className="gold-border-button"
                onClick={this.setFilter}
              >
                {t("check_offer")}
              </button>
            </div>
          </div>
        ) : (
          <div />
        )}

        {this.props.cluster ? (
          <div className="cluster" onClick={this.props.onClick}>
            <div className="cluster-inner">{this.props.number}</div>
          </div>
        ) : (
          <div className="pin" onClick={this.onPinClick}>
            <img src="/media/marker.png" />
          </div>
        )}
      </div>
    );
  }
}

// export the connected class
// function mapStateToProps(state) {
//   return {
//     filter: state.filter || {},
//   };
// }

export default GoogleMapPin;
