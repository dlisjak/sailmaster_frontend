import 'react-dates-gte-react-17/initialize';
import { useState } from "react";
import { DateRangePicker } from "react-dates-gte-react-17";
import { useTranslation } from 'next-i18next';
import moment from "moment";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import "moment/locale/sl";

moment.locale(process.env.NEXT_PUBLIC_REACT_APP_MOMENT_LANGUAGE);

const isDayBlocked = (day) => {
  return day.weekday() !== 5 ? true : false;
};

const DateRangeSelect = ({ onSelect, value }) => {
  const { t } = useTranslation("common");
  const [focusedInput, setFocusedInput] = useState();
  const { width } = useWindowDimensions();

  return (
    <div className={`date-range-select--focus-${focusedInput || "none"}`}>
      <DateRangePicker
        startDatePlaceholderText={t("offer_filter_date_range_start")}
        endDatePlaceholderText={t("offer_filter_date_range_end")}
        startDate={value && value.startDate}
        startDateId="your_unique_start_date_id"
        endDate={value && value.endDate}
        endDateId="your_unique_end_date_id"
        onDatesChange={onSelect}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        isDayBlocked={isDayBlocked}
        showClearDates
        numberOfMonths={width > 800 ? 2 : 1}
        block
        hideKeyboardShortcutsPanel
        transitionDuration={0}
        renderCalendarInfo={() => (
          <div
            dangerouslySetInnerHTML={{ __html: t("date_info") }}
            className="calendar-date-info"
          />
        )}
      />
    </div>
  );
};

export default DateRangeSelect;
