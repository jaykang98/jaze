// App.tsx
import React, { useEffect } from "react";
import styles from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "../components/container/Container";
import ErrorBoundary from "./ErrorBoundary";
import { useAuthenticator } from "../hooks/useAuthenticator";

function App() {
    const { setUserID, getUserID } = useAuthenticator();

    useEffect(() => {
        const id = getUserID();
        setUserID(id);
    }, []);
    return (

    <ErrorBoundary>
      <div className={styles.appContainer}>
        <Router>
                    <Container userID={getUserID()} />
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;
