import React, { useState } from "react";
import Select from "react-select";

const CustomSelect = ({ value, onChange, options, placeholder }) => {
  const [currentValue, setcurrentValue] = useState(value);
  const onChangecurrentValue = (currentValue) => {
    onChange(currentValue);
    setcurrentValue(currentValue);
  };
  return (
    <Select
      options={options}
      value={currentValue}
      onChange={onChangecurrentValue}
      isClearable={true}
      placeholder={placeholder}
    />
  );
};

export default CustomSelect;
