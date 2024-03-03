import React from "react";
import { OptionListProps } from "types/componentTypes";
import Button from "../button/Button";
import styles from './OptionList.module.css'; 

const OptionList: React.FC<OptionListProps> = ({ dataType, options }) => {
    if (!Array.isArray(options)) {
        console.error('OptionList component expects "options" prop to be an array.');
        return null;
    }

    const filteredOptions = options.filter(option => option.dataType === dataType);

    if (filteredOptions.length) {
        return (
            <div className={styles.optionList}>
                {filteredOptions.map((option, index) => (
                    <Button key={index}>{option.key}</Button>
                ))}
            </div>
        );
    }
    return null;
};

export default OptionList;
