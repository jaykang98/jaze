// TimeSelectionRow.tsx
import React from "react";
import OptionList from "../../../components/foundations/optionList/OptionList";
import Input from "../../../components/foundations/input/Input";

const TimeSelectionRow = ({ timestamp, onChange }) => {
    const currentYear = new Date().getFullYear();
    const yearsOptions = Array.from({ length: 4 }, (_, i) => ({
        key: `${currentYear - i}`, // Adding a key property
        value: `${currentYear - i}`, // Renaming name to value
    }));



    return (
        <tr>
            <td>
                <Input
                    id=""
                    type="datetime-local"
                    name="timestamp" // Adjusted to use a valid name
                    value={timestamp}
                    onChange={onChange}
                    placeholder="Select a time" // Adjusted to use a meaningful placeholder
                />
            </td>
            <td>
                <OptionList options={yearsOptions} />
            </td>
        </tr>
    );
};

export default TimeSelectionRow;
