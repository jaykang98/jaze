import React, { useEffect, useState } from "react";
import Input from "../../foundations/input/Input";
import OptionList from "../../foundations/optionList/OptionList";
import styles from "./CriteriaSelector.module.css";
import { SelectionType } from "../../../types/dataTypes";
import { Option } from "types/foundationTypes";

const CriteriaSelector: React.FC<{
    setSelectionType: (value: SelectionType) => void;
    setFormData: (value: { [key: string]: any }) => void;
    selectionType: SelectionType;
    formData: { [key: string]: any };
    albumData: any;
    artistData: any;
    trackData: any;
}> = ({
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
            value: album.name,
            key: album.name,
            datatype: "album",
          })) || [];
        break;
      case "artist":
        newOptions =
          artistData?.topartists.artist.map((artist) => ({
            value: artist.name,
            key: artist.name,
            datatype: "artist",
          })) || [];
        break;
      case "track":
        newOptions =
          trackData?.toptracks.track.map((track) => ({
            value: track.name,
            key: track.name,
            datatype: "track",
          })) || [];
        break;
    }
    setOptions(newOptions);
  }, [albumData, artistData, trackData, selectionType]);

  const changeCat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value as SelectionType;
    setSelectionType(newType);
  };
  const changeCatButtons = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const catSelector = (
    <select value={selectionType} onChange={changeCat}>
      {["artist", "album", "track"].map((type) => (
        <option key={type} value={type} title="Criteria">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );

  return (
    <div className={styles.criteriaSelector}>
      {catSelector}
      <Input
        id={selectionType}
        dataType={selectionType}
        name={selectionType}
        value={formData[selectionType] || ""}
        onChange={changeCatButtons}
        placeholder={`Enter ${selectionType}`}
        type={""}
      />
      <OptionList options={options} dataType={selectionType} />
    </div>
  );
};

export default CriteriaSelector;
