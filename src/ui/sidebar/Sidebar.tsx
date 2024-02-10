import React from 'react';
import styles from './Sidebar.module.css';
import SidebarButton from '../../ui/sidebarButton/SidebarButton';

const Sidebar = () => {
    const buttons = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/settings", label: "Settings" }
    ];

    return (
        <aside className={styles.sidebar} >
            {buttons.map(button => (
                <SidebarButton key={button.path} path={button.path}>{button.label}</SidebarButton>
            ))}
        </aside>
    );
};

export default Sidebar;
