// InputSelection.tsx
import React from "react";
import Input from "../../foundations/input/Input";
import OptionList from "../../foundations/optionList/OptionList";
import TimeSelectionRow from "../timeSelectionRow/TimeSelectionRow";
import { InputSelectionProps } from "types/componentTypes";
//import styles from "./InputSelection"
const InputSelection: React.FC<InputSelectionProps> = ({
  selectionType,
  formData,
  handleTypeChange,
    handleOptionSelect,
  userID,
}) => (
  <>
        <tr>
      <td>
        <select value={selectionType} onChange={handleTypeChange}>
          <option value="track">Track</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
            </td>         
      <td>
        <Input
          id={selectionType}
          type="text"
          name={selectionType}
          value={formData[selectionType]}
          placeholder={`Enter ${selectionType} name`}
        />
      </td>
            <td>
                <OptionList
                    dataType={selectionType} // 'artists', 'albums', or 'tracks'
                    onSelect={(option) => handleOptionSelect(selectionType, option)}
                    userID={userID} // Assuming you have a userID state or prop available
                />
            </td>
    </tr>
    <tr>
      <td>Start Time</td>
      <td colSpan={2}>
        <TimeSelectionRow
          timestamp={formData.startTimestamp}
          onYearSelect={(year) => console.log(year)}
          onChange={undefined}
        />
      </td>
    </tr>
    <tr>
      <td>End Time</td>
      <td colSpan={2}>
        <TimeSelectionRow
          timestamp={formData.endTimestamp}
          onYearSelect={(year) => console.log(year)}
          onChange={undefined}
        />
      </td>
    </tr>
  </>
);

export default InputSelection;
