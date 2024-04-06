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

    const handleOptionClick = (optionValue: string) => {
        setSelectedTimestamp(optionValue);
        if (onOptionSelect) {
            onOptionSelect(optionValue);
        }
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
                onChange={(e) => setSelectedTimestamp(e.target.value)}
            />
            <OptionList dataType={type} options={yearsOptions} />
        </div>
    );
};

export default TimestampSelector;