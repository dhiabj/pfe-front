import React, { useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "../../css/styles.css";

function PeriodDatepicker({ value, onChange }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState(null);

  const rangeDatesChangeHandler = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const onFocusChangeRangeHandler = (focusedInput) => {
    setFocusedInput(focusedInput);
  };

  return (
    <div>
      <DateRangePicker
        startDate={startDate}
        startDateId={Math.floor(Math.random() * 10).toString()}
        endDate={endDate}
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
