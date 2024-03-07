// FileName: GenerateDataForm.tsx

import React, { useEffect, useState } from 'react';
import Input from '../../foundations/input/Input';
import OptionList from '../../foundations/optionList/OptionList';
import TimeSelectionRow from '../timeSelectionRow/TimeSelectionRow';
import { fetchUserData } from '../../../hooks/dataManagement/fetchUserData';
import {
  GenerateDataFormProps,
  SelectionType,
} from '../../../types/structureTypes'; 
import Button from '../../foundations/button/Button';
import { Option } from 'types/foundationTypes';

const GenerateDataForm: React.FC<GenerateDataFormProps> = ({
  formData,
  setFormData,
  userID,
}) => {
  const { userData, albumData, artistData, trackData, error, loading } = fetchUserData(userID);
  const [selectionType, setSelectionType] = useState<SelectionType>('artist');
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    let newOptions: Option[] = [];
    switch (selectionType) {
      case 'album':
        newOptions = albumData?.topalbums.album.map((album) => ({
          value: album.url,
          key: `${album.artist.name} - ${album.name}`,
          dataType: 'album',
        })) || [];
        break;
      case 'artist':
        newOptions = artistData?.topartists.artist.map((artist) => ({
          value: artist.url,
          key: artist.name,
          dataType: 'artist',
        })) || [];
        break;
      case 'track':
        newOptions = trackData?.toptracks.track.map((track) => ({
          value: track.url,
          key: `${track.artist.name} - ${track.name}`,
          dataType: 'track',
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

  return (
    <div className="misc">
      <div className="optionContainer">
        <select value={selectionType} onChange={handleTypeChange} id="selectionInput">
          {['artist', 'album', 'track'].map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        <Input
          id="selectionInput"
          type="text"
          name={selectionType}
          value={formData[selectionType] || ''}
          onChange={handleInputChange}
          placeholder={`Enter ${selectionType}`}
        />
        <OptionList options={options} dataType={selectionType} id="selectionInput"/>
      </div>
      <TimeSelectionRow timestamp={formData.startTimestamp} />
      <TimeSelectionRow timestamp={formData.endTimestamp} />
      <Button type="submit">Submit</Button>
    </div>
  );
};

export default GenerateDataForm;
