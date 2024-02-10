// SidebarButton.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SidebarButton.module.css';

const SidebarButton = ({ path, children }) => {
    return (
        <Link to={path} className={styles.button} role="button">
            {children} {/* Include children inside the Link */}
        </Link>
    );
};

export default SidebarButton;
