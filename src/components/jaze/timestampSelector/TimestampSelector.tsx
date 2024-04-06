import React from "react";
import OptionList from "../../foundations/optionList/OptionList";
import Input from "../../foundations/input/Input";
import { SelectionType } from "../../../types/dataTypes";
import styles from "./TimestampSelector.module.css";

const TimestampSelector: React.FC<{
  timestamp: string;
  label: string;
  onOptionSelect?: (timestamp: string) => void;
}> = ({ timestamp, label, onOptionSelect }) => {
  const [selectedTimestamp, setSelectedTimestamp] = React.useState(timestamp);
  const currentYear = React.useMemo(() => new Date().getFullYear(), []);
  const type: SelectionType = label.includes("Start") ? "yearStart" : "yearEnd";
  const [validationError, setValidationError] = React.useState<string | null>(
    null,
  );

  const handleOptionClick = (optionValue: string) => {
    if (validateTimestamp(optionValue)) {
      setSelectedTimestamp(optionValue);
      setValidationError(null);
      if (onOptionSelect) {
        onOptionSelect(optionValue);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validateTimestamp(value)) {
      setSelectedTimestamp(value);
      setValidationError(null);
      if (onOptionSelect) {
        onOptionSelect(value);
      }
    }
  };

  const validateTimestamp = (value: string) => {
    if (type === "yearEnd") {
      const yearStart = new Date(selectedTimestamp).getFullYear();
      const yearEnd = new Date(value).getFullYear();
      if (yearEnd < yearStart) {
        setValidationError("YearEnd cannot be earlier than YearStart.");
        return false;
      }
    } else if (type === "yearStart") {
      const yearEnd = new Date(selectedTimestamp).getFullYear();
      const yearStart = new Date(value).getFullYear();
      if (yearStart > yearEnd) {
        setValidationError("YearStart cannot be later than YearEnd.");
        return false;
      }
    }
    return true;
  };

  const yearsOptions = React.useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      const year = currentYear - i;
      const date = new Date(`${year}-01-01`).toISOString().slice(0, 10);

      return {
        key: `${year}`,
        dataType: type,
        value: date,
        label: date,
        onClick: () => handleOptionClick(date),
      };
    });
  }, [currentYear, type]);

  return (
    <div className={styles.timestampSelector}>
      <span className={styles.timeLabel}>{label}</span>
      <Input
        id={label}
        type="date"
        value={selectedTimestamp}
        dataType={type}
        onChange={handleInputChange}
        style={{ borderColor: validationError ? "red" : undefined }}
      />
      {validationError && <p className={styles.errorText}>{validationError}</p>}
      <OptionList dataType={type} options={yearsOptions} />
    </div>
  );
};

export default TimestampSelector;
