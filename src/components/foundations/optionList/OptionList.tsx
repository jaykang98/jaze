// Filename: OptionList.tsx
import React from "react";
import styles from "./OptionList.module.css";
import Button from "../button/Button";
import { useUserData } from 'hooks/useUserData';
interface Option {
  name: string;
}

interface OptionListProps {
    dataType: 'album' | 'artist' | 'track';
    onSelect: (selectedOption: Option) => void;
    userID: string;
    options?:[];
}

const OptionList: React.FC<OptionListProps> = ({ dataType, onSelect, userID }) => {
    const { userTopAlbums, userTopArtists, userTopTracks } = useUserData(userID);

    let dataToDisplay = [];
    switch (dataType) {
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
        <div className={styles.optionList}>
            {dataToDisplay.map((item) => (
                <Button
                    key={item.name}
                    onClick={() => onSelect(item)}
                    className=""
                >
                    {item.name}
                </Button>
            ))}
        </div>
    );
};

export default OptionList;