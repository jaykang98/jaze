import React from "react";
import OptionList from "../../foundations/optionList/OptionList";
import Input from "../../foundations/input/Input";
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
  const currentYear = React.useMemo(() => new Date().getFullYear(), []);

  const yearsOptions = React.useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        key: `${currentYear - i}`,
        dataType: "year" as SelectionType,
        value: `${currentYear - i}`,
      })),
    [currentYear],
  );

  const optionProps: OptionListProps = React.useMemo(
    () => ({
      dataType: "year",
      options: yearsOptions,
    }),
    [yearsOptions],
  );

  return (
    <div className={styles.timestampSelector}>
      <span className={styles.timeLabel}>{label}</span>
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
