// Container.js or Container.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../../ui/header/Header'; 
import Sidebar from '../../ui/sidebar/Sidebar'; 
import Main from '../../components/Main/Main'; 
import About from '../../components/About/About'; 
import Settings from '../../components/Settings/Settings'; 
import Footer from '../footer/Footer';
import styles from './Container.module.css'; 

function Container() {
    return (
        <div className={styles.appContainer} >
            <Header />
                <div className={styles.contentWrapper}>
                    <Sidebar />
                    <div className={styles.mainContent}>
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </div>
                </div>
            <Footer />
        </div>
    );
}


export default Container;
