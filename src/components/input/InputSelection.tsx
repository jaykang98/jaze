// InputSelection.tsx
import React from "react";
import Input from "../../components/input/Input";
import OptionList from "../../components/optionList/OptionList";
import TimeSelectionRow from "../../components/timeSelectionRow/TimeSelectionRow";
import { FormData, Options } from "../../index.d";

type SelectionType = "artist" | "album" | "track";

interface InputSelectionProps {
  selectionType: SelectionType;
  formData: FormData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Options;
  handleOptionSelect: (type: keyof FormData, option: { name: string }) => void;
  userID?: string;
}

const InputSelection: React.FC<InputSelectionProps> = ({
  selectionType,
  formData,
  handleChange,
  handleTypeChange,
  options,
  handleOptionSelect,
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
          onChange={handleChange}
          placeholder={`Enter ${selectionType} name`}
        />
      </td>
      <td>
        <OptionList
          options={options[`${selectionType}s`].map((name) => ({ name }))}
          onSelect={(option) => handleOptionSelect(selectionType, option)}
        />
      </td>
    </tr>
    <tr>
      <td>Start Time</td>
      <td colSpan={2}>
        <TimeSelectionRow
          label="Start Time"
          timestamp={formData.startTimestamp}
          onYearSelect={(year) => console.log(year)} // Adjust based on actual functionality
          onChange={undefined}
        />
      </td>
    </tr>
    <tr>
      <td>End Time</td>
      <td colSpan={2}>
        <TimeSelectionRow
          label="End Time"
          timestamp={formData.endTimestamp}
          onYearSelect={(year) => console.log(year)} // Adjust based on actual functionality
          onChange={undefined}
        />
      </td>
    </tr>
  </>
);

export default InputSelection;
