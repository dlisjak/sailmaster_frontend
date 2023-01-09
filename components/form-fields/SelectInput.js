import React from "react";
import classNames from "classnames";

export default class SelectInput extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      value: props.defaultValue || "",
      active: props.defaultValue ? true : false,
    };

    // Bind functions
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  // if isValueUpdating is set to true and defaultValue changed, then update
  // the value.
  componentWillReceiveProps(nextProps) {
    if (nextProps.isValueUpdating) {
      if (nextProps.defaultValue) {
        this.setState({ value: nextProps.defaultValue, active: true });

        // Call also props on Change function
        this.props.input.onChange(nextProps.defaultValue);
      } else {
        this.setState({ value: "", active: false });

        // Call also props on Change function
        this.props.input.onChange("");
      }
    }
  }

  // After component did mount set value
  componentDidMount() {
    this.props.input.onChange(this.state.value);
  }

  // Update value and set active state
  onSelectChange(event) {
    this.setState({ active: true, value: event.target.value });

    // Call also props onChange function
    this.props.input.onChange(event.target.value);
  }

  render() {
    const main_class = classNames({
      "select-input": true,
      "select-input-active": this.state.active,
      "select-input-disabled": this.props.disabled,
      "select-input-error": this.props.error,
    });

    return (
      <div className={main_class}>
        {this.props.required ? (
          <label>
            <span>*</span> {this.props.label}
          </label>
        ) : (
          <label>{this.props.label}</label>
        )}
        <div>
          <select
            {...this.props.input}
            onChange={this.onSelectChange}
            value={this.state.value}
            required={this.props.required}
          >
            {this.props.children}
          </select>
        </div>
      </div>
    );
  }
}
