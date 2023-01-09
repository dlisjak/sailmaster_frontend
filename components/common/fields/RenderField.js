import React from "react";
import TextInput from "../../form-fields/TextInput";

const RenderField = ({
  input,
  label,
  type,
  required,
  value,
  defaultValue,
  disabled,
  isValueUpdating,
  meta: { touched, error, warning },
}) => (
  <TextInput
    label={label}
    input={input}
    type={type}
    touched={touched}
    error={error}
    warning={warning}
    required={required}
    defaultValue={defaultValue}
    disabled={disabled}
    isValueUpdating={isValueUpdating}
  />
);

export default RenderField;
