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

    const yearsOptions = React.useMemo(() => {
        return Array.from({ length: 10 }, (_, i) => {
            const year = currentYear - i;
            const date = new Date(`${year}-01-01T00:00:00Z`);
            const timestamp = date.getTime();

            return {
                key: `${year}`,
                dataType: "year" as SelectionType,
                value: `${year}`,
                label: `${timestamp}`, 
            };
        });
    }, [currentYear]);

  const optionProps: OptionListProps = React.useMemo(
    () => ({
      dataType: "year",
          options: yearsOptions,
          key: "",
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
              label={timestamp}
        placeholder="Select Date and Time"
      />
      <OptionList {...optionProps} />
    </div>
  );
};

export default TimestampSelector;
