import React from "react";
import OptionList from "components/foundations/optionList/OptionList";
import Input from "components/foundations/input/Input";
import { SelectionType } from "../../../types/dataTypes";
import { OptionListProps } from "../../../types/foundationTypes";

import styles from "./TimestampSelector.module.css";

interface TimestampSelectorProps {
  timestamp: string;
  label: string;
}

const TimestampSelector: React.FC<TimestampSelectorProps> = ({
  timestamp,
  label,
}) => {
  const currentYear = new Date().getFullYear();
  const yearsOptions = Array.from({ length: 4 }, (_, i) => ({
    key: `${currentYear - i}`,
    dataType: "year" as SelectionType,
    value: `${currentYear - i}`,
  }));

  const optionProps: OptionListProps = {
    dataType: "year",
    options: yearsOptions,
  };

  return (
    <div className={styles.timeSelectionRow}>
      <span>{label}</span>
      <Input
        id="datetime-local-input"
        type="datetime-local"
        name="timestamp"
        value={timestamp}
        placeholder="Select Date and Time"
      />
      <OptionList {...optionProps} />
    </div>
  );
};

export default TimestampSelector;
