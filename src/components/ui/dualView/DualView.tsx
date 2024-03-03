import React from 'react';
import styles from './DualView.module.css'; // Adjust the import path as necessary

interface DualViewProps {
    children: React.ReactNode;
    splitPercentage?: number;
}

const DualView: React.FC<DualViewProps> = ({ children, splitPercentage = 50 }) => {
    const validChildren = React.Children.toArray(children).slice(0, 2);
    
    return (
        <div className={styles.dualViewContainer}>
            <div className={styles.childContainer} style={{ width: `${splitPercentage}%` }}>
                {validChildren[0]}
            </div>
            <div className={styles.childContainer} style={{ width: `${100 - splitPercentage}%` }}>
                {validChildren[1]}
            </div>
        </div>
    );
};

export default DualView;
