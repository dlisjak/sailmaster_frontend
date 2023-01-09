import { components } from "react-select";
import AsyncSelect from "react-select/async";
import { customTheme, customStyles } from "../../utils/reactSelectTheme";
import { useTranslation } from 'next-i18next';

const CustomOption = ({ children, ...props }) => {
  const { t } = useTranslation();

  return (
    <div>
      <components.Option {...props}>
        <span>{children}</span>{" "}
        <span className="react-select__obj-type">
          {t(`destination_select_type_${props.data.obj_type}`)}
        </span>
      </components.Option>
    </div>
  );
};

const DestinationSelect = ({
  searchDestinations,
  value,
  defaultValue,
  setValue,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      <AsyncSelect
        styles={customStyles}
        theme={customTheme}
        className="react-select-container react-select-container--destinations"
        classNamePrefix="react-select"
        components={{ Option: CustomOption }}
        cacheOptions
        defaultOptions
        loadOptions={searchDestinations}
        value={value || null}
        isMulti
        onChange={(values, action) => {
          setValue(values);
        }}
        noOptionsMessage={(value) => t("destination_select_no_results")}
        placeholder={t("destination_select_placeholder")}
      />
    </div>
  );
};

export default DestinationSelect;
