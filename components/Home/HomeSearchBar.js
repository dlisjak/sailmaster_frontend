import { useTranslation } from "next-i18next";
import { browserHistory } from "react-router-dom";
import classNames from "classnames";
import moment from "moment";
import DateRange from "../common/DateRange";

// Import components
import { MAX_CABIN_NUMBER } from "../../constants/common";
import DropdownWithSearch from "./../common/DropdownWithSearch";
import YachtType from "./../common/YachtType";
import YachtCabins from "./../common/YachtCabins";
import getDateFormat from "./../common/utils/getDateFormat";
import Calendar from "../icons/Calendar";
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  FormLabel,
  DropdownButton,
} from "react-bootstrap";
import { getInitialFilterValues } from "../common/utils/getInitialFilterValues";
import generateQueryString from "../common/utils/generateQueryString";
import checkObjectSize from "../common/utils/checkObjectSize";
import getOffersLink from "../common/utils/getOffersLink";
import { getDate } from "../common/utils/getDate";
import getFormData from "../../api/utils/getFormData";

class HomeSearchBar extends React.Component {
  constructor(props) {
    super(props);
    moment.locale(props.i18n.language === "it" ? "it" : "sl");
    const yachtCabins = [
      { value: "0-1" },
      { value: "1-2" },
      { value: "2-3" },
      { value: "3-4" },
      { value: "4-5" },
      { value: "5-6" },
      { value: "6-7" },
      { value: "8-" },
    ];

    // State
    this.state = {
      home_search: {
        destination: "",
        destinationString: "",
        yachtType: "",
        yachtTypeString: "",
        yachtCabins: "",
        startDate: getDate(true),
        endDate: getDate(false),
      },
      startDate: getDate(true),
      endDate: getDate(false),
      focusDestination: false,
      focusYachtType: false,
      focusYachtCabins: false,
      locations: [],
      focusedInput: null,
      yachtCabins,
    };

    // Bind functions
    this.handleChangeDestination = this.handleChangeDestination.bind(this);
    this.handleChangeYachtType = this.handleChangeYachtType.bind(this);
    this.changeFocusDestination = this.changeFocusDestination.bind(this);
    this.changeFocusYachtType = this.changeFocusYachtType.bind(this);
    this.handleChangeYachtCabins = this.handleChangeYachtCabins.bind(this);
    this.changeFocusYachtCabins = this.changeFocusYachtCabins.bind(this);
    this.onDateFocus = this.onDateFocus.bind(this);
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const objSize = checkObjectSize(this.props.filter);
    let filter;

    const query = browserHistory.getCurrentLocation().query || {};
    filter = getInitialFilterValues(query);

    this.setState({ ...filter });
  }

  componentWillReceiveProps(nextProps) {
    let lang = "sl";

    if (nextProps.i18n.language === "it") {
      moment.locale("it");
      lang = "it";
    }
  }

  handleChangeDestination(value, string) {
    let _tmp = JSON.parse(JSON.stringify(this.state.home_search));
    _tmp.startDate = this.state.startDate;
    _tmp.endDate = this.state.endDate;
    _tmp.destination = value;
    _tmp.destinationString = string;

    this.setState({ home_search: _tmp });

    let _home_search = JSON.parse(JSON.stringify(_tmp));
    _home_search["startDate"] = getDateFormat(this.state.startDate);
    _home_search["endDate"] = getDateFormat(this.state.endDate);

    generateQueryString(_home_search);
  }

  handleChangeYachtType(value, string) {
    let _tmp = JSON.parse(JSON.stringify(this.state.home_search));
    _tmp.startDate = this.state.startDate;
    _tmp.endDate = this.state.endDate;
    _tmp.yachtType = value;
    _tmp.yachtTypeString = string;

    this.setState({ home_search: _tmp });

    let _home_search = JSON.parse(JSON.stringify(_tmp));
    _home_search["startDate"] = getDateFormat(this.state.startDate);
    _home_search["endDate"] = getDateFormat(this.state.endDate);

    generateQueryString(_home_search);
  }

  changeFocusYachtType(focusYachtType) {
    this.setState({ focusYachtType });
  }

  handleChangeYachtCabins(value) {
    let _tmp = JSON.parse(JSON.stringify(this.state.home_search));
    _tmp.yachtCabins = value;
    _tmp.yacht__cabins_total__gte = value.split("-")[0];
    _tmp.yacht__cabins_total__lte = value.split("-")[1];
    _tmp.startDate = this.state.startDate;
    _tmp.endDate = this.state.endDate;

    this.setState({ home_search: _tmp });

    let _home_search = JSON.parse(JSON.stringify(_tmp));
    _home_search["startDate"] = getDateFormat(this.state.startDate);
    _home_search["endDate"] = getDateFormat(this.state.endDate);

    generateQueryString(_home_search);
  }

  changeFocusYachtCabins(focusYachtCabins) {
    this.setState({ focusYachtCabins });
  }

  changeFocusDestination(focusDestination) {
    this.setState({ focusDestination });

    if (!focusDestination) {
      this.onDateFocus("startDate");
    }
  }

  // Handle date range focus changes
  onDateFocus(focusedInput) {
    this.setState({ focusedInput });
  }

  onDatesChange({ startDate, endDate }) {
    endDate = endDate ? endDate : startDate;

    let home_search = JSON.parse(JSON.stringify(this.state.home_search));
    home_search["startDate"] = startDate;
    home_search["endDate"] = endDate;

    this.setState({ home_search, startDate, endDate });

    let _home_search = JSON.parse(JSON.stringify(home_search));
    _home_search["startDate"] = getDateFormat(_home_search["startDate"]);
    _home_search["endDate"] = getDateFormat(_home_search["endDate"]);

    generateQueryString(_home_search);
  }

  handlePriceChange(value) {
    this.setState({ price: value });
  }

  onSubmit() {
    const search = JSON.parse(JSON.stringify(this.state.home_search));

    if (search.startDate) {
      search.startDate = getDateFormat(search.startDate);
    }

    if (search.endDate) {
      search.endDate = getDateFormat(search.endDate);
    }

    search.lang = this.props.i18n.language;

    if (!!search.destination) {
      const data = {
        destination: search.destination,
        lang: search.lang,
        link: t("offers_link"),
        params: search,
      };

      this.props.dispatch({ type: "FETCH_OFFERS_LOCATION", payload: data });
    } else {
      const queryString = getFormData(search);

      browserHistory.push({
        pathname: `/${t("offers_link")}`,
        search: `?${queryString}`,
      });
    }
  }

  render() {
    const { t } = useTranslation("common");
    const dateRangeClass = classNames({
      focused: !!this.state.focusedInput,
      "date-range-wrapper": true,
      "focused-calendar-2": this.state.focusedInput === "startDate",
      "focused-calendar-1": this.state.focusedInput === "endDate",
    });

    return (
      <form>
        <FormGroup controlId="homeSearchBar">
          <Col xs={12} sm={12} md={3} lg={3}>
            <FormLabel>{t("starting_point")}</FormLabel>
            <DropdownWithSearch
              value={this.state.home_search.destinationString}
              values={this.props.locations}
              changeFocusDestination={this.changeFocusDestination}
              focusDestination={this.state.focusDestination}
              handleChangeDestination={this.handleChangeDestination}
            />
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} className="date-range">
            <FormLabel>{t("from_date")}</FormLabel>
            <FormLabel>{t("to_date")}</FormLabel>
            <div className="triangle triangle-first" />
            <div className="triangle triangle-last" />
            <div className={dateRangeClass}>
              <div className="calendar-1">
                <Calendar />
              </div>
              <div className="calendar-2">
                <Calendar />
              </div>
              <DateRange
                value={{
                  startDate: this.state.home_search.startDate,
                  endDate: this.state.home_search.endDate,
                }}
                focusedInput={this.state.focusedInput}
                onDateFocus={this.onDateFocus}
                onDatesChange={this.onDatesChange}
              />
            </div>
          </Col>
          <Col xs={12} sm={6} md={2} lg={2}>
            <FormLabel>{t("yacht_type")}</FormLabel>
            <YachtType
              value={this.state.home_search.yachtTypeString}
              values={this.props.yachtType}
              changeFocus={this.changeFocusYachtType}
              focusState={this.state.focusYachtType}
              handleChange={this.handleChangeYachtType}
            />
          </Col>
          <Col xs={12} sm={6} md={1} lg={1} className="yacht-cabins-wrapper">
            <FormLabel>
              {t("yacht_cabins").length > 9
                ? t("yacht_cabins").substring(0, 7) + "."
                : t("yacht_cabins")}
            </FormLabel>
            <YachtCabins
              value={this.state.home_search.yachtCabins}
              values={this.state.yachtCabins}
              changeFocus={this.changeFocusYachtCabins}
              focusState={this.state.focusYachtCabins}
              handleChange={this.handleChangeYachtCabins}
            />
          </Col>
          <Col xs={12} sm={12} md={2} lg={2}>
            <button
              className="gold-button"
              type="button"
              onClick={this.onSubmit}
            >
              {t("search")}
            </button>
          </Col>
        </FormGroup>
      </form>
    );
  }
}

// export the connected class
function mapStateToProps(state) {
  return {
    locations: state.locations || [],
    yachtType: state.yachtType || [],
    filter: state.filter || {},
  };
}
export default HomeSearchBar;
