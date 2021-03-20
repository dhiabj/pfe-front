import React, { useState } from "react";
import { SingleDatePicker } from "react-dates";

const DatePicker = ({ value, onChange }) => {
  const [date, setDate] = useState(value);
  const [focused, setFocused] = useState();
  const onChangeDate = (date) => {
    onChange(date);
    setDate(date);
  };
  return (
    <SingleDatePicker
      date={date} // momentPropTypes.momentObj or null
      onDateChange={onChangeDate} // PropTypes.func.isRequired
      focused={focused} // PropTypes.bool
      onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
      id="your_unique_id" // PropTypes.string.isRequired,
    />
  );
};

export default DatePicker;
