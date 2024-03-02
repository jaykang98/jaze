// GenerateDataForm.tsx
import React from "react";
import Input from "../../foundations/input/Input";
import OptionList from "../../foundations/optionList/OptionList";
import TimeSelectionRow from "../timeSelectionRow/TimeSelectionRow";
import { useUserData } from '../../../hooks/useUserData';
import { SelectionType } from "../../../types/componentTypes";

interface GenerateDataFormProps {
    formData: FormData;
    userID?: string;
}
const GenerateDataForm: React.FC<GenerateDataFormProps> = ({
    selectionType,
    formData,
    handleTypeChange,
    userID,
}) => {
    const { AlbumData, ArtistData, TrackData } = useUserData(userID);

    let dataToDisplay;
    switch (selectionType) {
        case 'album':
            dataToDisplay = AlbumData || [];
            break;
        case 'artist':
            dataToDisplay = ArtistData || [];
            break;
        case 'track':
            dataToDisplay = TrackData || [];
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
                                options={dataToDisplay}
                                dataType={selectionType}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Start Time</td>
                        <td colSpan={2}>
                            <TimeSelectionRow
                                timestamp={formData.startTimestamp}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>End Time</td>
                        <td colSpan={2}>
                            <TimeSelectionRow
                                timestamp={formData.endTimestamp}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default InputSelection;
