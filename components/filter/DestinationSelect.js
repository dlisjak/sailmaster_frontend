import { components } from "react-select";
import Select from "react-select";
import { customTheme, customStyles } from "../../utils/reactSelectTheme";
import { useTranslation } from 'next-i18next';
import { useSearchDestinations } from "../../queries/queries";

const CustomOption = ({ children, ...props }) => {
  const { t } = useTranslation("common");

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
  value,
  setValue,
}) => {
  const { t } = useTranslation("common");
  const { searchDestinations } = useSearchDestinations();

  return (
    <div>
      <Select
        id="destination"
        styles={customStyles}
        theme={customTheme}
        className="react-select-container react-select-container--destinations"
        classNamePrefix="react-select"
        components={{ Option: CustomOption }}
        options={searchDestinations}
        defaultOptions
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
