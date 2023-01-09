import React from "react";
import TextAreaInput from "../../form-fields/TextAreaInput";

const RenderTextAreaField = ({
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
  <TextAreaInput
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

export default RenderTextAreaField;
