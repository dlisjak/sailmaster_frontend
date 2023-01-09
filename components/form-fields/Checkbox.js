import React from "react";
import classNames from "classnames";

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      checked: this.props.defaultChecked ? true : false,
      value: this.props.defaultChecked ? this.props.defaultValue : undefined,
    };

    // Bind functions
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  onCheckboxChange(e) {
    const checked = !this.state.checked;
    const value = checked ? this.props.defaultValue : undefined;

    this.setState({ checked, value });

    // Call props merthod
    this.props.onChange(e);
  }

  render() {
    const formCheckboxCLassname = classNames({
      "form-checkbox": true,
      "form-checkbox-error": this.props.error,
    });

    return (
      <div className={formCheckboxCLassname}>
        <input
          className="form-styled-checkbox"
          id={this.props.name}
          type="checkbox"
          value={this.state.value}
          checked={this.state.checked}
          onChange={this.onCheckboxChange}
        />
        <label htmlFor={this.props.name}>
          <span
            contentEditable="true"
            dangerouslySetInnerHTML={{ __html: this.props.label }}
          />
        </label>
      </div>
    );
  }
}
