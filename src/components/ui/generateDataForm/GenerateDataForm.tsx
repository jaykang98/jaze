// FileName: GenerateDataForm.tsx

import React, { useState } from "react";
import TimeSelectionRow from "../timeSelectionRow/TimeSelectionRow";
import { fetchUserData } from "../../../hooks/dataManagement/fetchUserData";
import {
  GenerateDataFormProps,
  SelectionType,
} from "../../../types/structureTypes";
import Button from "../../foundations/button/Button";
import CriteriaSelectionRow from "../../ui/criteriaSelectionRow/CriteriaSelectionRow";

const GenerateDataForm: React.FC<GenerateDataFormProps> = ({
  formData,
  setFormData,
  userID,
}) => {
  const { albumData, artistData, trackData } = fetchUserData(userID);
  const [selectionType, setSelectionType] = useState<SelectionType>("artist");

  return (
    <form onSubmit={(e) => e.preventDefault()} id="GenerateVisForm">
      <div className="misc">
        <CriteriaSelectionRow
          selectionType={selectionType}
          setSelectionType={setSelectionType}
          formData={formData}
          setFormData={setFormData}
          albumData={albumData}
          artistData={artistData}
          trackData={trackData}
        />
        <TimeSelectionRow
          timestamp={formData.startTimestamp}
          label="Start Time"
        />
        <TimeSelectionRow timestamp={formData.endTimestamp} label="End Time" />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default GenerateDataForm;
