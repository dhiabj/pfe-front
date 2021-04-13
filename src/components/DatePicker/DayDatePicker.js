import React, { useState } from "react";
import { SingleDatePicker } from "react-dates";

const DayDatePicker = ({ value, onChange }) => {
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
      isOutsideRange={() => false}
      focused={focused} // PropTypes.bool
      onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
      id={Math.floor(Math.random() * 10).toString()} // PropTypes.string.isRequired,
    />
  );
};

export default DayDatePicker;
