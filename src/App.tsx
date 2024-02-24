// App.tsx
import React from "react";
import styles from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "./ui/container/Container";
import ErrorBoundary from "./ErrorBoundary";
import HandleAuth from "./utils/HandleAuth";

function App() {
<<<<<<< Updated upstream
    const { userID, error } = HandleAuth(); 
=======
>>>>>>> Stashed changes
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
