import React from "react";
import styles from "./TimeSelectionRow.module.css";
import OptionList from "../optionList/OptionList";
import Input from "../input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";

const TimeSelectionRow = ({ label, timestamp, onChange, onYearSelect }) => {
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
        <FontAwesomeIcon icon={faHourglassEnd} />
      </td>
      <td>End Time</td>
      <td>
        <Input
          id="endTimestamp"
          type="datetime-local"
          name="endTimestamp"
          value={timestamp}
          onChange={onChange}
          placeholder="End timestamp"
        />
      </td>
      <td>
        <OptionList options={yearsOptions} onSelect={handleSelect} />
      </td>
    </tr>
  );
};

export default TimeSelectionRow;
