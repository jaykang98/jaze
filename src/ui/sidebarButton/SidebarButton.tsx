import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SidebarButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarButton = ({ path, children, icon }) => {
    return (
        <Link to={path} className={styles.button} role="button">
            <FontAwesomeIcon icon={icon} /> {children}
        </Link>
    );
};

export default SidebarButton;
