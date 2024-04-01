import React from "react";
import OptionList from "../../foundations/optionList/OptionList";
import Input from "../../foundations/input/Input";
import { SelectionType } from "../../../types/dataTypes";
import { OptionListProps } from "../../../types/foundationTypes";
import styles from "./TimestampSelector.module.css";

interface TimestampSelectorProps {
    timestamp: string;
    label: string;
    onOptionSelect?: (timestamp: string) => void; 
}

const TimestampSelector: React.FC<TimestampSelectorProps> = ({
    timestamp,
    label,
    onOptionSelect,
}) => {
    const currentYear = React.useMemo(() => new Date().getFullYear(), []);
    const type: SelectionType = label.includes('start') ? 'yearStart' : 'yearEnd';
    const handleOptionClick = (optionValue: string) => {
        if (onOptionSelect) {
            onOptionSelect(optionValue);
        }
    };
    const yearsOptions = React.useMemo(() => {
        return Array.from({ length: 10 }, (_, i) => {
            const year = currentYear - i;
            const date = new Date(`${year}-01-01T00:00:00Z`).toISOString().slice(0, 10); 

            return {
                key: `${year}`,
                dataType: type, 
                value: date,
                label: date,
                onClick: () => handleOptionClick(date), 
            };
        });
    }, [currentYear, handleOptionClick]);

    return (
        <div className={styles.timestampSelector}>
            <span className={styles.timeLabel}>{label}</span>
            <Input
                id={label}
                type='datetime-local'
                name=""
                value={timestamp}
                label={label}
                placeholder=""
                dataType={label}
            />
            <OptionList
                dataType={type} 
                options={yearsOptions}
            />
        </div>
    );
};



export default TimestampSelector;
