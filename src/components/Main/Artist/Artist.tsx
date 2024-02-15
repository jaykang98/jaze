// src/components/Artist.tsx
import React from 'react';
import Input from '../../../ui/input/Input';
import OptionList from '../../../ui/optionList/OptionList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface ArtistProps {
    artist: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (option: { name: string }) => void;
    options: Array<{ name: string }>;
}

const Artist: React.FC<ArtistProps> = ({ artist, onChange, onSelect, options }) => {
    return (
        <tr>
            <td><FontAwesomeIcon icon={faUser} /></td>
            <td>Artist</td>
            <td>
                <Input
                    id="artist"
                    type="text"
                    name="artist"
                    value={artist}
                    onChange={onChange}
                    placeholder="Enter artist name"
                />
            </td>
            <td>
                <OptionList options={options} onSelect={onSelect} />
            </td>
        </tr>
    );
};

export default Artist;
