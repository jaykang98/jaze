// FileName: src/App.tsx
import React from "react";
import styles from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "../components/container/Container";
import ErrorBoundary from "./ErrorBoundary";
import { useAuthenticator } from "../hooks/useAuthenticator";
function App() {
  const { getUserID, } = useAuthenticator();
  const userID = getUserID();
  const handleViewChange = (view: string) => {
    console.log("View changed to:", view);
  };

  return (
    <ErrorBoundary>
      <div className={styles.appContainer}>
        <Router>
          <Container userID={userID} onViewChange={handleViewChange} />
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;
