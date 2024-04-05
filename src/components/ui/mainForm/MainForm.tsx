// FileName: GenerateDataForm.tsx
import React, { useState } from "react";
import TimeStampSelector from "../../jaze/timestampSelector/TimestampSelector";
import { fetchUserData } from "../../../hooks/dataManagement/fetchUserData";
import { MainFormProps, SelectionType } from "../../../types/structureTypes";
import Button from "../../foundations/button/Button";
import CriteriaSelector from "../../jaze/criteriaSelector/CriteriaSelector";
import Styles from "./MainForm.module.css";
const MainForm: React.FC<MainFormProps> = ({
  formData,
  setFormData,
  userID,
}) => {
  const { albumData, artistData, trackData } = fetchUserData(userID);
  const [selectionType, setSelectionType] = useState<SelectionType>("artist");
  const handleStartTimeSelect = (timestamp: string) => {
    setFormData({ ...formData, startTimestamp: timestamp });
  };

  const handleEndTimeSelect = (timestamp: string) => {
    setFormData({ ...formData, endTimestamp: timestamp });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} id="GenerateVisForm">
      <CriteriaSelector
        selectionType={selectionType}
        setSelectionType={setSelectionType}
        formData={formData}
        setFormData={setFormData}
        albumData={albumData}
        artistData={artistData}
        trackData={trackData}
      />
      <TimeStampSelector
        timestamp={formData.startTimestamp}
        label="Start Time"
        onOptionSelect={handleStartTimeSelect}
      />
      <TimeStampSelector
        timestamp={formData.endTimestamp}
        label="End Time"
        onOptionSelect={handleEndTimeSelect}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default MainForm;
