// FileName: src/App.tsx
import React, { useEffect } from "react";
import styles from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "../components/foundations/container/Container";
import ErrorBoundary from "./ErrorBoundary";
import { useAuthenticator } from "../hooks/useAuthenticator";

function App() {
    const { fetchSession, getUserID } = useAuthenticator();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (token && !getUserID()) {
            fetchSession(token);
        }
    }, [fetchSession, getUserID]);
    return (
        <ErrorBoundary>
            <div className={styles.appContainer}>
                <Router>
                    <Container onViewChange={() => { }} />
                </Router>
            </div>
        </ErrorBoundary>
    );
}

export default App;