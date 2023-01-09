import React from "react";
import SelectInput from "../../form-fields/SelectInput";

const RenderSelectField = ({
  field,
  label,
  meta: { touched, error },
  children,
  required,
  defaultValue,
  disabled,
  isValueUpdating,
  ...custom
}) => (
  <SelectInput
    label={label}
    error={touched && error}
    {...field}
    children={children}
    {...custom}
    required={required}
    defaultValue={defaultValue}
    disabled={disabled}
    isValueUpdating={isValueUpdating}
  />
);

export default RenderSelectField;
