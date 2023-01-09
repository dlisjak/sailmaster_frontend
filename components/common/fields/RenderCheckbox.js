import React from "react";
import Checkbox from "../../form-fields/Checkbox";

const RenderCheckbox = ({
  input,
  label,
  defaultValue,
  defaultChecked,
  meta: { error },
}) => (
  <Checkbox
    label={label}
    onCheck={input.onChange}
    {...input}
    defaultValue={defaultValue}
    defaultChecked={defaultChecked}
    error={error}
  />
);

export default RenderCheckbox;
