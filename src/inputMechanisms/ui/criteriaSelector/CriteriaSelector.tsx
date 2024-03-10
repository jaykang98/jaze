// FileName: CriteriaSelectionRow.tsx

import React, { useEffect, useState } from "react";
import Input from "components/foundations/input/Input";
import OptionList from "components/foundations/optionList/OptionList";
import { SelectionType } from "../../../types/structureTypes";
import { Option } from "types/foundationTypes";
import styles from "./CriteriaSelector.module.css";

interface CriteriaSelectorProps {
  selectionType: SelectionType;
  setSelectionType: (value: SelectionType) => void;
  formData: { [key: string]: any };
  setFormData: (value: { [key: string]: any }) => void;
  albumData: any;
  artistData: any;
  trackData: any;
}

const CriteriaSelector: React.FC<CriteriaSelectorProps> = ({
  selectionType,
  setSelectionType,
  formData,
  setFormData,
  albumData,
  artistData,
  trackData,
}) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    let newOptions: Option[] = [];
    switch (selectionType) {
      case "album":
        newOptions =
          albumData?.topalbums.album.map((album) => ({
            value: album.url,
            key: `${album.artist.name} - ${album.name}`,
            dataType: "album",
          })) || [];
        break;
      case "artist":
        newOptions =
          artistData?.topartists.artist.map((artist) => ({
            value: artist.url,
            key: artist.name,
            dataType: "artist",
          })) || [];
        break;
      case "track":
        newOptions =
          trackData?.toptracks.track.map((track) => ({
            value: track.url,
            key: `${track.artist.name} - ${track.name}`,
            dataType: "track",
          })) || [];
        break;
    }
    setOptions(newOptions);
  }, [albumData, artistData, trackData, selectionType]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value as SelectionType;
    setSelectionType(newType);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const selectionElement = (
    <select value={selectionType} onChange={handleTypeChange}>
      {["artist", "album", "track"].map((type) => (
        <option key={type} value={type} title="Criteria">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );

  return (
    <>
      <div className={styles.criteriaSelector}>
        {selectionElement}
        <Input
          id="selectionInput"
          type="text"
          name={selectionType}
          value={formData[selectionType] || ""}
          onChange={handleInputChange}
          placeholder={`Enter ${selectionType}`}
        />
        <OptionList options={options} dataType={selectionType} />
      </div>
    </>
  );
};

export default CriteriaSelector;
