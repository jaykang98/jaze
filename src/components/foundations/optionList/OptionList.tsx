// OptionList.tsx
import React from "react";
import { OptionListProps } from "types/componentTypes";

const OptionList: React.FC<OptionListProps> = ({ dataType, options }) => {
    const filteredOptions = options.filter(option => option.dataType === dataType);

    if (filteredOptions.length) {
        return (
            <div>
                {filteredOptions.map((option, index) => (
                    <div key={index}>
                        <p>{option.key}</p>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default OptionList;
