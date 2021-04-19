import React, { useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "../../css/styles.css";

function PeriodDatepicker({ value, onChange }) {
  const [date, setDate] = useState(value);
  const [focusedInput, setFocusedInput] = useState(null);
  const rangeDatesChangeHandler = ({ startDate, endDate }) => {
    onChange({ startDate, endDate });
    setDate({ startDate, endDate });
  };

  const onFocusChangeRangeHandler = (focusedInput) => {
    setFocusedInput(focusedInput);
  };
  return (
    <div>
      <DateRangePicker
        startDate={date?.startDate}
        startDateId={Math.floor(Math.random() * 10).toString()}
        endDate={date?.endDate}
        endDateId={Math.floor(Math.random() * 10).toString()}
        onDatesChange={rangeDatesChangeHandler}
        focusedInput={focusedInput}
        onFocusChange={onFocusChangeRangeHandler}
        displayFormat={() => "DD/MM/YYYY"}
        isOutsideRange={() => false}
      />
    </div>
  );
}

export default PeriodDatepicker;
