// src/components/Track.tsx
import React from 'react';
import Input from '../../../ui/input/Input';
import OptionList from '../../../ui/optionList/OptionList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

interface TrackProps {
    track: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (option: { name: string }) => void;
    options: Array<{ name: string }>;
}

const Track: React.FC<TrackProps> = ({ track, onChange, onSelect, options }) => {
    return (
        <tr>
            <td><FontAwesomeIcon icon={faMusic} /></td>
            <td>Track</td>
            <td>
                <Input
                    id="track"
                    type="text"
                    name="track"
                    value={track}
                    onChange={onChange}
                    placeholder="Enter track name"
                />
            </td>
            <td>
                <OptionList options={options} onSelect={onSelect} />
            </td>
        </tr>
    );
};

export default Track;
