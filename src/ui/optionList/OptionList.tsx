// OptionList.tsx
import React from "react";
import styles from "./OptionList.module.css";
import Button from "../../ui/button/Button";
interface OptionList {
    artists: Array<{ name: string }>;
    albums: Array<{ name: string }>;
    tracks: Array<{ name: string }>;
}
interface Option {
    name: string;
}

interface OptionListProps {
    options: Option[];
    onSelect: (selectedOption: Option) => void;
    userID: string;
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
