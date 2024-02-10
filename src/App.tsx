// App.tsx
import React from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './ui/container/Container';

function App() {
    return (
        <div className={styles.appContainer}>
            <Router>
                <Container />
            </Router>
        </div>
    );
}

export default App;