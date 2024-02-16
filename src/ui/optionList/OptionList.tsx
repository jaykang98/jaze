// OptionList.tsx
import React from "react";
import styles from "./OptionList.module.css";
import Button from "../../ui/button/Button";

interface Option {
  name: string;
}

interface OptionListProps {
  options: Option[];
  onSelect: (selectedOption: Option) => void; // Callback function for when an option is selected
}

const OptionList: React.FC<OptionListProps> = ({ options, onSelect }) => {
  return (
    <div className={styles.optionList}>
      {options.map((option) => (
        <Button key={option.name} onClick={() => onSelect(option)}>
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default OptionList;
