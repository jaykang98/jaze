// InputSelection.tsx
import React from "react";
import Input from "../../foundations/input/Input";
import OptionList from "../../foundations/optionList/OptionList";
import TimeSelectionRow from "../timeSelectionRow/TimeSelectionRow";
import { InputSelectionProps } from "types/componentTypes";
import { useUserData } from '../../../hooks/useUserData';

const InputSelection: React.FC<InputSelectionProps> = ({
    selectionType,
    formData,
    handleTypeChange,
    handleOptionSelect,
    userID,
}) => {
    const { userTopAlbums, userTopArtists, userTopTracks } = useUserData(userID);

    let dataToDisplay = [];
    switch (selectionType) {
        case 'album':
            dataToDisplay = userTopAlbums || [];
            break;
        case 'artist':
            dataToDisplay = userTopArtists || [];
            break;
        case 'track':
            dataToDisplay = userTopTracks || [];
            break;
        default:
            break;
    }

    return (
        <>
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
                                value={formData[selectionType]}
                                placeholder={`Enter ${selectionType} name`}
                            />
                        </td>
                        <td>
                            <OptionList
                                options={dataToDisplay.map(item => ({ key: item.id, value: item.name, dataType:item.dataType }))}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Start Time</td>
                        <td colSpan={2}>
                            <TimeSelectionRow
                                timestamp={formData.startTimestamp}
                                onYearSelect={(year) => console.log(year)}
                                onChange={(e) => console.log(e)} // Update with actual change handling
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>End Time</td>
                        <td colSpan={2}>
                            <TimeSelectionRow
                                timestamp={formData.endTimestamp}
                                onYearSelect={(year) => console.log(year)}
                                onChange={(e) => console.log(e)} // Update with actual change handling
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default InputSelection;
