import React, { useState } from "react";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "../../css/styles.css";

const DayDatePicker = ({ value, onChange }) => {
  const [date, setDate] = useState(value);
  const [focused, setFocused] = useState();
  const onChangeDate = (date) => {
    onChange(date);
    setDate(date);
  };
  return (
    <SingleDatePicker
      date={date}
      onDateChange={onChangeDate}
      focused={focused}
      onFocusChange={({ focused }) => setFocused(focused)}
      id={Math.floor(Math.random() * 10).toString()}
      isOutsideRange={() => false}
      displayFormat={() => "DD/MM/YYYY"}
      block
    />
  );
};

export default DayDatePicker;
