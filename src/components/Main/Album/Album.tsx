// src/components/Album.tsx
import React from 'react';
import Input from '../../../ui/input/Input';
import OptionList from '../../../ui/optionList/OptionList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';

interface AlbumProps {
    album: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (option: { name: string }) => void;
    options: Array<{ name: string }>;
}

const Album: React.FC<AlbumProps> = ({ album, onChange, onSelect, options }) => {
    return (
        <tr>
            <td><FontAwesomeIcon icon={faCompactDisc} /></td>
            <td>Album</td>
            <td>
                <Input
                    id="album"
                    type="text"
                    name="album"
                    value={album}
                    onChange={onChange}
                    placeholder="Enter album title"
                />
            </td>
            <td>
                <OptionList options={options} onSelect={onSelect} />
            </td>
        </tr>
    );
};

export default Album;
