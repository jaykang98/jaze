// App.tsx
import React, { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './ui/container/Container';

function App() {
    useEffect(() => {
        const handleMessage = (event) => {
            // Check the origin of the message for security purposes
            if (event.origin !== window.location.origin) {
                return; // Ignore messages from unknown sources
            }

            console.log('Message from popup:', event.data);        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <div className={styles.appContainer}>
            <Router>
                <Container />
            </Router>
        </div>
    );
}

export default App;
