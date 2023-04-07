import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import InputRange from '../InputRange';
import { useTranslation } from 'next-i18next';

import { customTheme, customStyles } from '../../utils/reactSelectTheme';

export const RequiredLabel = ({ name }) => (
  <>
    <span className="required">* </span> {name}
  </>
);

export const Field = ({
  name,
  formikBag: { values, handleChange, touched, errors },
  label = null,
  ...props
}) => {
  return (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        name={name}
        value={values[name]}
        onChange={handleChange}
        isInvalid={touched[name] && errors[name]}
        {...props}
      />
      <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
    </>
  );
};

export const Checkbox = ({
  name,
  id,
  formikBag: { values, handleChange, touched, errors },
  label = null,
  ...props
}) => {
  return (
    <>
      <Form.Check id={id}>
        <Form.Check.Input
          required
          name={name}
          value={values[name]}
          onChange={handleChange}
          isInvalid={touched[name] && errors[name]}
        />
        <Form.Check.Label>{label}</Form.Check.Label>
        <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
      </Form.Check>
    </>
  );
};

export const DefaultSelectField = ({
  items,
  name,
  formikBag: { values, handleChange, touched, errors },
  label = null,
  ...props
}) => {
  return (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        as="select"
        name={name}
        value={values[name]}
        onChange={handleChange}
        isInvalid={touched[name] && errors[name]}
        {...props}
      >
        {items.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </Form.Control>
      <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
    </>
  );
};

export const CountrySelect = ({ countries, name, label, formikBag, ...props }) => {
  return (
    <DefaultSelectField
      countries={countries}
      name={name}
      label={label}
      formikBag={formikBag}
      items={countries.map((country) => ({
        id: country.id,
        name: country.name.name,
      }))}
      {...props}
    />
  );
};

export const RangeField = ({
  fieldName,
  label,
  minValue,
  maxValue,
  values,
  setValue,
  displayAndMore = true,
  formatValue = null,
}) => {
  const value = values[fieldName];
  useEffect(() => {
    setCurrent(value);
  }, [value]);
  const { t } = useTranslation('common');
  const [current, setCurrent] = useState(value);
  const currentOrDefault = current || { min: minValue, max: maxValue };

  if (!formatValue) {
    formatValue = (value) => value;
  }

  return (
    <div className="range-line form-group">
      <label className="form-label">
        {label}:
        <span>
          {' '}
          {formatValue(currentOrDefault.min)}
          {' - '}
          {formatValue(currentOrDefault.max)}
          {displayAndMore && currentOrDefault.max === maxValue && ' ' + t('and_more')}
        </span>
      </label>
      <div className="range-wrapper">
        <InputRange
          allowSameValues
          minValue={minValue}
          maxValue={maxValue}
          value={currentOrDefault}
          onChangeComplete={(value) => {
            setValue(fieldName, value);
          }}
          onChange={(value) => {
            setCurrent(value);
          }}
        />
      </div>
    </div>
  );
};

export const SelectField = ({
  fieldName,
  values,
  label,
  options,
  setValue,
  placeholder,
  className = '',
}) => {
  const value = values
    ? options?.find((item) => String(item.value) === String(values[fieldName]))
    : null;

  console.log({ value });

  return (
    <div className={`form-group ${className}`}>
      <label className="form-label" htmlFor={fieldName}>
        {label}
      </label>
      <Select
        id={fieldName}
        styles={customStyles}
        theme={customTheme}
        className="react-select-container"
        classNamePrefix="react-select"
        options={options}
        isClearable={true}
        value={value || null}
        onChange={(value) => {
          setValue(fieldName, value ? value.value : null);
        }}
        placeholder={placeholder}
      />
    </div>
  );
};
