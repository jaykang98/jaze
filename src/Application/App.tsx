// FileName: src/App.tsx
import React, { useEffect } from "react";
import styles from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "../components/container/Container";
import ErrorBoundary from "./ErrorBoundary";
import { useAuthenticator } from "../hooks/useAuthenticator";

function App() {
    const { startAuth, fetchSession,getUserID } = useAuthenticator();

    const handleViewChange = (view: string) => {
        console.log("View changed to:", view);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token && !getUserID) {
            fetchSession(token);
        }
    }, [fetchSession, startAuth]); 

    return (
        <ErrorBoundary>
            <div className={styles.appContainer}>
                <Router>
                    <Container onViewChange={handleViewChange} />
                </Router>
            </div>
        </ErrorBoundary>
    );
}

export default App;
