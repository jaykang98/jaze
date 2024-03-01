import React from "react";
import OptionList from "../../../components/foundations/optionList/OptionList";
import Input from "../../../components/foundations/input/Input"
interface TimeSelectionRowProps {
    timestamp: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onYearSelect: (year: number) => void;
}

const TimeSelectionRow: React.FC<TimeSelectionRowProps> = ({ timestamp, onChange, onYearSelect }) => {
    const currentYear = new Date().getFullYear();
    const yearsOptions = Array.from({ length: 4 }, (_, i) => ({
        key: `${currentYear - i}`, // Ensure each option has a unique key
        name: `${currentYear - i}`,
    }));

    const handleSelect = (selectedOption: { name: string }) => {
        const year = parseInt(selectedOption.name, 10);
        onYearSelect(year);
    };

    return (
        <tr>
            <td>
                <Input
                    id="datetime-local-input"
                    type="datetime-local"
                    name="timestamp"
                    value={timestamp}
                    onChange={onChange}
                    placeholder="Select Date and Time"
                />
            </td>
            <td>
                <OptionList options={yearsOptions} onSelect={handleSelect} />
            </td>
        </tr>
    );
};

export default TimeSelectionRow;

