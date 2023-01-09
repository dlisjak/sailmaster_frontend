import React from "react";
import classNames from "classnames";

export default class TextAreaInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue || "",
      active: props.defaultValue ? true : false,
      touched: false,
    };

    // Bind functions
    this.onInputClicked = this.onInputClicked.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
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

  // Set active state to true, when user click in input
  onInputClicked() {
    this.setState({ active: true });
  }

  // Check if value isn't equal '', if its not,
  // then set active state to true
  onInputBlur() {
    if (this.state.value.length === 0)
      this.setState({ active: false, touched: true });
  }

  // Update value and set active state
  onInputChange(e) {
    this.setState({ value: e.target.value, active: true });

    // Call also props on Change function
    this.props.input.onChange(e);
  }

  // Render
  render() {
    const main_class = classNames({
      "text-input": true,
      "text-input-active": this.state.active,
      "text-input-disabled": this.props.disabled,
      "text-input-error": this.props.error && this.state.touched,
    });

    return (
      <div className={main_class}>
        <div>
          <textarea
            {...this.props.input}
            onClick={this.onInputClicked}
            onChange={this.onInputChange}
            onBlur={this.onInputBlur}
            value={this.state.value}
          ></textarea>
        </div>
      </div>
    );
  }
}
