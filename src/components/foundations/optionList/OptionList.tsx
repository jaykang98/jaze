// OptionList.tsx
import React from "react";
import { OptionProps } from "types/componentTypes";

const OptionList: React.FC<OptionProps> = ({ options }) => {
    if (options) {
        return (
            <div>
                {options.map((option, index) => (
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
