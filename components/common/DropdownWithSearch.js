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

class DropdownWithSearch extends React.Component {
  constructor(props) {
    super(props);

    // Najdi hrvaško
    this.state = {
      initial_values: Array.isArray(props.values) ? props.values : [],
      values: Array.isArray(props.values) ? props.values : [],
      openKeys: [],
      search_term: "",
      defaultSet: false,
      valuesWasSet: false,
    };

    // Bind functions
    this.onClick = this.onClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
    this.onTitleClick = this.onTitleClick.bind(this);
    this.renderValues = this.renderValues.bind(this);
    this.filterValuesByValue = this.filterValuesByValue.bind(this);
    this.onInputSearchTermChange = this.onInputSearchTermChange.bind(this);
    this.deleteSelection = this.deleteSelection.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let search_term = "";

    if (!this.state.defaultSet) {
      if (!!nextProps.value) {
        search_term = nextProps.value;
      }

      if (this.state.valuesWasSet) {
        this.setState({
          search_term,
          defaultSet: true,
        });
      } else {
        this.setState({
          search_term,
          values: nextProps.values,
          defaultSet: true,
          valuesWasSet: nextProps.values.length > 0 ? true : false,
        });
      }
    } else {
      if (!!nextProps.value) {
        search_term = nextProps.value;
      } else {
        search_term = this.state.search_term;
      }

      if (this.state.valuesWasSet) {
        this.setState({
          search_term,
        });
      } else {
        this.setState({
          search_term,
          values: nextProps.values,
          valuesWasSet: nextProps.values.length > 0 ? true : false,
        });
      }
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
        this.changeFocusDestination(false);
      }
    }
  }

  /*
  Filter values by search_term state when it changed
  */
  filterValuesByValue(values, search_term, array) {
    let _search_term = search_term.toLowerCase();

    for (let item of values) {
      if (item.name.toLowerCase().includes(_search_term)) {
        array.push(item);
      }

      if (item.children)
        this.filterValuesByValue(item.children, search_term, array);
    }

    this.setState({
      values: array,
    });
  }

  /*
  Get destination by id
  */
  getDestinationById(values, id, array) {
    for (let item of values) {
      if (item.id === id) {
        array.push(item);
      }

      if (item.children) {
        this.getDestinationById(item.children, id, array);
      }
    }

    return array.length > 0 ? array[0].name : "";
  }

  /*
  Handle input term search term change
  */
  onInputSearchTermChange(search_term) {
    this.setState({ search_term });

    if (search_term.length > 0) {
      this.filterValuesByValue(this.props.values, search_term, []);
    } else {
      this.setState({ values: this.state.initial_values });
    }
  }

  /*
  Action that perform when somebody click to single menu item
  */
  onClick(info, item) {
    let id = info.key;

    const values = JSON.parse(JSON.stringify(this.state.values));
    let search_term = this.getDestinationById(values, id, []);

    this.props.handleChangeDestination(id, search_term);

    this.setState({
      search_term,
    });

    this.changeFocusDestination(false);
  }

  /*
  Hangle changes when submenu open
  */
  onOpenChange(openKeys) {
    this.setState({
      openKeys,
    });
  }

  onTitleClick({ key }) {
    const values = JSON.parse(JSON.stringify(this.state.values));
    let search_term = this.getDestinationById(values, key, []);

    this.props.handleChangeDestination(key, search_term);

    this.setState({
      search_term,
    });
  }

  /*
  Render values
  */
  renderValues(values) {
    let _this = this;

    return values.map(function (value) {
      if (!value.children)
        return <DropdownItem key={value.id}>{value.name}</DropdownItem>;

      return (
        <SubMenu
          key={value.id}
          title={value.name}
          onTitleClick={_this.onTitleClick}
        >
          {_this.renderValues(value.children)}
        </SubMenu>
      );
    });
  }

  deleteSelection(e) {
    const props = this.props;
    this.props.handleChangeDestination("", "");
    this.setState({
      initial_values: Array.isArray(props.values) ? props.values : [],
      values: Array.isArray(props.values) ? props.values : [],
      openKeys: [],
      search_term: "",
      defaultSet: false,
      valuesWasSet: false,
      search_term: "",
      focusDestination: false,
    });
    window.setTimeout(() => {
      this.setState({ search_term: "" });
    }, 100);
  }

  changeFocusDestination(focusDestination) {
    this.setState({ focusDestination });
  }

  render() {
    const { t } = useTranslation("common");
    const values = this.renderValues(this.state.values);

    return (
      <div className="dropdown-with-seatch" ref="destinationSearch">
        <HandLens />
        <div
          className="triangle"
          onClick={() => this.props.changeFocusDestination(true)}
        />
        {this.state.search_term && (
          <span className="delete" onClick={this.deleteSelection}>
            ×
          </span>
        )}

        <FormControl
          type="text"
          value={this.state.search_term}
          placeholder={t("starting_point_placeholder")}
          onChange={(event) => this.onInputSearchTermChange(event.target.value)}
          onFocus={() => this.changeFocusDestination(true)}
          autoComplete="off"
        />
        {this.state.focusDestination ? (
          <div className="dropdown-with-seatch-active">
            <Scrollbars autoHeight autoHeightMin={0} autoHeightMax={200}>
              <Menu
                onClick={this.onClick}
                mode="inline"
                onOpenChange={this.onOpenChange}
                openKeys={this.state.openKeys}
              >
                {values}
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

DropdownWithSearch.defaultProps = {
  values: [],
};

export default DropdownWithSearch;
