// FileName: GenerateDataForm.tsx
import React, { useState } from "react";
import TimeStampSelector from "../../jaze/timestampSelector/TimestampSelector";
import { MainFormProps, SelectionType } from "../../../types/structureTypes";
import Button from "../../foundations/button/Button";
import CriteriaSelector from "../../jaze/criteriaSelector/CriteriaSelector";
import Styles from "./MainForm.module.css";
import { useLocalStorage } from "../../../hooks/utils/useLocalStorage";

const MainForm: React.FC<MainFormProps> = ({
  formData,
  setFormData,
}) => {
    const { getItem } = useLocalStorage();
    const albumData = JSON.parse(getItem("lastFMAlbumData"));
    const artistData = JSON.parse(getItem("lastFMArtistData"));
    const trackData = JSON.parse(getItem("lastFMTrackData"));
    const [selectionType, setSelectionType] = useState<SelectionType>("artist");
  const handleStartTimeSelect = (timestamp: string) => {
    setFormData({ ...formData, startTimestamp: timestamp });
  };

  const handleEndTimeSelect = (timestamp: string) => {
    setFormData({ ...formData, endTimestamp: timestamp });
  };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(
            `Selection Type: ${selectionType}, Start Time: ${formData.startTimestamp}, End Time: ${formData.endTimestamp}`
        );
    };
  return (
      <form onSubmit={handleSubmit} id="GenerateVisForm">
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
      <Button type="submit">
        Submit
      </Button>
    </form>
  );
};

export default MainForm;
