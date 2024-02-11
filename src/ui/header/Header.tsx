// Header.jsx or Header.tsx
import React from 'react';
import styles from './Header.module.css';

type HeaderProps = {
    className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
    return (
        <header className={`${styles.header} ${className || ''}`}>
            <h1>Last.FM User Data</h1>
        </header>
    );
};

export default Header;
