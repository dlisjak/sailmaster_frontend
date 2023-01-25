import React from "react";
import { useTranslation } from "next-i18next";
import ReactDOM from "react-dom";

// Import components
import { Scrollbars } from "react-custom-scrollbars";
import Menu, { SubMenu, Item as DropdownItem } from "rc-menu";
import { FormControl } from "react-bootstrap";

import "rc-menu/assets/index.css";

import HandLens from "../icons/HandLens";
import CaretDown from "../icons/CaretDown";

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

class YachtBuilders extends React.Component {
  constructor(props) {
    super(props);

    // Najdi hrvaško
    this.state = {
      initial_values: Array.isArray(props.values) ? props.values : [],
      values: Array.isArray(props.values) ? props.values : [],
      openKeys: [],
      search_term: "",
      defaultSet: false,
    };

    // Bind functions
    this.onClick = this.onClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
    this.renderValues = this.renderValues.bind(this);
    this.onInputSearchTermChange = this.onInputSearchTermChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let search_term = "";

    if (this.props.values.length === 0 && nextProps.values.length > 0) {
      this.setState({ values: nextProps.values });
    }
  }

  componentDidMount() {
    if (!!this.props.value && this.props.value !== this.state.search_term) {
      this.setState({
        search_term: this.props.value,
      });
    }
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
    const domNode = ReactDOM.findDOMNode(this.refs.destinationSearch);

    if (!domNode || !domNode.contains(event.target)) {
      if (this.refs.destinationSearch) {
        this.props.changeFocus(false);
      }
    }
  }

  /*
  Handle input term search term change
  */
  onInputSearchTermChange(search_term) {
    if (search_term.length > 0) {
      const values = this.props.values.filter((value) =>
        normalize(value.name).includes(normalize(search_term))
      );
      this.setState({ values, search_term });
    } else {
      this.setState({ values: this.props.values, search_term: "" });
      this.props.handleChange("");
    }
  }

  /*
  Action that perform when somebody click to single menu item
  */
  onClick(info) {
    let id = typeof info.key === "string" ? parseInt(info.key, 10) : info.key;
    const filterArray = this.props.values.filter((value) => value.id === id);

    if (filterArray.length > 0) {
      this.props.handleChange(filterArray[0].id, filterArray[0].name);
      this.setState({
        search_term: filterArray[0].name,
      });
    } else {
      this.setState({
        search_term: "",
      });
    }

    this.props.changeFocus(false);
  }

  /*
  Hangle changes when submenu open
  */
  onOpenChange(openKeys) { }

  /*
  Render values
  */
  renderValues() {
    return this.state.values.map(function (value) {
      return <DropdownItem key={value.id}>{value.name}</DropdownItem>;
    });
  }

  render() {
    const { t } = useTranslation("common");
    const values = this.renderValues(this.state.values);

    return (
      <div className="dropdown-with-seatch" ref="destinationSearch">
        <HandLens />
        <div
          className="triangle"
          onClick={() => this.props.changeFocus(true)}
        />
        {this.state.search_term && (
          <span
            className="delete"
            onClick={(e) => {
              this.setState({ valuesWasSet: true, search_term: "" });
              this.props.handleChange("", "");
            }}
          >
            ×
          </span>
        )}
        <FormControl
          type="text"
          value={this.state.search_term}
          placeholder={t("yacht_brand")}
          onChange={(event) => this.onInputSearchTermChange(event.target.value)}
          onFocus={() => this.props.changeFocus(true)}
          onBlur={() => this.props.changeFocus(true)}
          autoComplete="off"
        />

        {this.props.focusState ? (
          <div className="dropdown-with-seatch-active">
            <Scrollbars autoHeight autoHeightMin={0} autoHeightMax={200}>
              <Menu
                onClick={this.onClick}
                mode="inline"
                onOpenChange={() => console.log("open")}
                openKeys={this.state.openKeys}
              >
                {this.renderValues()}
              </Menu>
            </Scrollbars>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

YachtBuilders.defaultProps = {
  values: [],
};

export default YachtBuilders;
