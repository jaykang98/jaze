import React, { useRef, useState, useLayoutEffect } from 'react';
import Button from '../../ui/button/Button';
import styles from './TimeSelectionRow.module.css'; // Import the CSS module for styling

interface YearButtonsProps {
    label: string;
    timestamp: string; // Add this line
    onYearSelect: (year: number) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add this line if it's missing
}

const YearButtons: React.FC<YearButtonsProps> = ({ label, timestamp, onYearSelect, onChange }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 4 }, (_, i) => currentYear - i);
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleButtons, setVisibleButtons] = useState(years.length);

    useLayoutEffect(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const buttonWidth = 60;
            const numberOfButtons = Math.floor(containerWidth / buttonWidth);
            setVisibleButtons(numberOfButtons);
        }
    }, []);

    return (
        <div>
            <div className={styles.yearButtonsContainer} ref={containerRef}>
                {years.slice(0, visibleButtons).map(year => (
                    <Button key={year} onClick={() => onYearSelect(year)}>
                        {year}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default YearButtons;