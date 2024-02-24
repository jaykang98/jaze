// Filename: OptionList.tsx
import React, { useState } from "react";
import styles from "./OptionList.module.css";
<<<<<<< Updated upstream
import Button from "../../ui/button/Button";

=======
import Button from "../button/Button"; 
>>>>>>> Stashed changes
interface Option {
  name: string;
}

interface OptionListProps {
  options: Option[];
<<<<<<< Updated upstream
  onSelect: (selectedOption: Option) => void; // Callback function for when an option is selected
=======
  onSelect: (selectedOption: Option) => void;
  userID?: string;
>>>>>>> Stashed changes
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
