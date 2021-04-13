import React, { useState } from "react";
import { DateRangePicker } from "react-dates";

const PeriodDatePicker = ({ value, onChange }) => {
  //   const [date, setDate] = useState(value);
  //   const [focused, setFocused] = useState();
  //   const onChangeDate = (date) => {
  //     onChange(date);
  //     setDate(date);
  //   };
  return (
    // <SingleDatePicker
    //   date={date} // momentPropTypes.momentObj or null
    //   onDateChange={onChangeDate} // PropTypes.func.isRequired
    //   isOutsideRange={() => false}
    //   focused={focused} // PropTypes.bool
    //   onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
    //   id={Math.floor(Math.random() * 10).toString()} // PropTypes.string.isRequired,
    // />
    <DateRangePicker
      startDate={this.state.startDate} // momentPropTypes.momentObj or null,
      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      endDate={this.state.endDate} // momentPropTypes.momentObj or null,
      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      onDatesChange={({ startDate, endDate }) =>
        this.setState({ startDate, endDate })
      } // PropTypes.func.isRequired,
      focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={(focusedInput) => this.setState({ focusedInput })} // PropTypes.func.isRequired,
    />
  );
};

export default PeriodDatePicker;
