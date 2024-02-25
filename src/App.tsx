// App.tsx
import React, { useReducer } from "react";
import styles from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "./ui/container/Container";
import ErrorBoundary from "./ErrorBoundary";

function App() {
    const { userID, error } = HandleAuth(); 
  return (
    <ErrorBoundary>
      <div className={styles.appContainer}>
        <Router>
          <Container userID={undefined} error={undefined} />
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;
