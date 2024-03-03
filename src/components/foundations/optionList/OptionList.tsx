// OptionList.tsx
import React from "react";
import { OptionListProps } from "types/componentTypes";
import Button from "../button/Button";

const OptionList: React.FC<OptionListProps> = ({ dataType, options }) => {
  if (!Array.isArray(options)) {
    console.error(
      'OptionList component expects "options" prop to be an array.',
    );
    return null;
  }

  const filteredOptions = options.filter(
    (option) => option.dataType === dataType,
  );

  if (filteredOptions.length) {
    return (
      <div>
        {filteredOptions.map((option, index) => (
          <div key={index}>
            <Button>{option.key}</Button>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default OptionList;
