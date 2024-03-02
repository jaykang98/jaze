import React from "react";
import OptionList from "../../../components/foundations/optionList/OptionList";
import Input from "../../../components/foundations/input/Input"
import { SelectionType,OptionProps } from "../../../types/componentTypes"

interface TimeSelectionRowProps {
    timestamp: string;
}

const TimeSelectionRow: React.FC<TimeSelectionRowProps> = ({ timestamp }) => {
    const currentYear = new Date().getFullYear();
    const yearsOptions = Array.from({ length: 4 }, (_, i) => ({
        key: `${currentYear - i}`,
        dataType: "year" as SelectionType,
        value: `${currentYear - i}`,
    }));

    const optionProps: OptionProps = {
        dataType: "year",
        options: yearsOptions,
    };

    return (
        <tr>
            <td>
                <Input
                    id="datetime-local-input"
                    type="datetime-local"
                    name="timestamp"
                    value={timestamp}
                    placeholder="Select Date and Time"
                />
            </td>
            <td>
                <OptionList {...optionProps} />
            </td>
        </tr>
    );
};

export default TimeSelectionRow;
