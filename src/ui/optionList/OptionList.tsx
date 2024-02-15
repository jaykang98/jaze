// OptionList.tsx
import React from 'react';
import styles from './OptionList.module.css';
import Button from '../../ui/button/Button';

interface Option {
    name: string;
}

interface OptionListProps {
    options: Option[];
    onSelect: (selectedOption: Option) => void; // Callback function for when an option is selected
}

const OptionList: React.FC<OptionListProps> = ({ options, onSelect }) => {
    const optionListRef = React.useRef<HTMLDivElement>(null);
    const [visibleOptions, setVisibleOptions] = React.useState(0);

    React.useLayoutEffect(() => {
        if (optionListRef.current) {
            const containerWidth = optionListRef.current.offsetWidth;
            const optionWidth = 120; // Width of option (adjust as needed)
            const numberOfOptions = Math.min(options.length, Math.floor(containerWidth / optionWidth));
            setVisibleOptions(numberOfOptions);
        }
    }, [options.length, optionListRef.current?.offsetWidth]);

    return (
        <div className={styles.optionList} ref={optionListRef}>
            {options.slice(0, visibleOptions).map((option) => (
                <Button key={option.name} onClick={() => onSelect(option)}>
                    {option.name}
                </Button>
            ))}
        </div>
    );
};

export default OptionList;
