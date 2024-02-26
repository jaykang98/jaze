// Filename: OptionList.tsx
import React, { useState } from "react";
import styles from "./OptionList.module.css";
import Button from "../button/Button";

interface Option {
  name: string;
}

interface OptionListProps {
  options: Option[];
  onSelect: (selectedOption: Option) => void;
  userID?: string;
}

const OptionList: React.FC<OptionListProps> = ({ options = [], onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className={styles.optionList}>
      {options.map((option) => (
        <Button
          key={option.name}
          onClick={() => handleSelect(option)}
          className={option === selectedOption ? styles.selected : ""}
        >
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default OptionList;
