import React from "react";
import OptionList from "../optionList/OptionList";
import Input from "../input/Input";


const TimeSelectionRow = ({ timestamp, onChange, onYearSelect }) => {
  const currentYear = new Date().getFullYear();
  const yearsOptions = Array.from({ length: 4 }, (_, i) => ({
    name: `${currentYear - i}`,
  }));

  const handleSelect = (selectedOption) => {
    const year = parseInt(selectedOption.name, 10);
    onYearSelect(year);
  };

  return (
    <tr>
      <td>
        <Input
          id=""
          type="datetime-local"
          name="${label}"
          value={timestamp}
          onChange={onChange}
          placeholder="${label}"
        />
      </td>
      <td>
        <OptionList options={yearsOptions} onSelect={handleSelect} />
      </td>
    </tr>
  );
};

export default TimeSelectionRow;
