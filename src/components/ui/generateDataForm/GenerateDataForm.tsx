// FileName: GenerateDataForm.tsx
import React, { useEffect } from "react";
import Input from "../../foundations/input/Input";
import OptionList from "../../foundations/optionList/OptionList";
import TimeSelectionRow from "../timeSelectionRow/TimeSelectionRow";
import { useUserData } from "../../../hooks/useUserData";
import {
  GenerateDataFormProps,
  GenerateDataFormState,
  SelectionType,
} from "../../../types/componentTypes";
import Button from "../../foundations/button/Button";

const GenerateDataForm: React.FC<GenerateDataFormProps> = ({
  formData,
  setFormData,
  userID,
  selectionType,
}) => {
  const { albumData, artistData, trackData } = useUserData(userID || "");

  useEffect(() => {
    const dataIsMissing = {
      album: !albumData,
      artist: !artistData,
      track: !trackData,
    };

    if (dataIsMissing[selectionType] && formData[selectionType]) {
      setFormData((prevFormData: GenerateDataFormState) => ({
        ...prevFormData,
        [selectionType]: "",
      }));
    }
  }, [albumData, artistData, trackData, selectionType, formData, setFormData]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectionType = event.target.value as SelectionType;
    setFormData({ ...formData, selectionType: newSelectionType });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [selectionType]: event.target.value });
  };

  let dataToDisplay;
  switch (selectionType) {
    case "album":
      dataToDisplay = albumData || [];
      break;
    case "artist":
      dataToDisplay = artistData || [];
      break;
    case "track":
      dataToDisplay = trackData || [];
      break;
    default:
      dataToDisplay = [];
      break;
  }

  return (
    <table>
      <tbody>
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
              value={formData[selectionType] || ""}
              placeholder={`Enter ${selectionType} name`}
              onChange={handleInputChange}
            />
          </td>
          <td>
            <OptionList options={dataToDisplay} dataType={selectionType} />
          </td>
        </tr>
        <tr>
          <td>Start Time</td>
          <td colSpan={2}>
            <TimeSelectionRow timestamp={formData.startTimestamp} />
          </td>
        </tr>
        <tr>
          <td>End Time</td>
          <td colSpan={2}>
            <TimeSelectionRow timestamp={formData.endTimestamp} />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            {" "}
            <Button type="submit">Submit</Button>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default GenerateDataForm;
