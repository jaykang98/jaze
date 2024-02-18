// App.tsx
import React, { useEffect } from "react";
import styles from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "./ui/container/Container";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className={styles.appContainer}>
        <Router>
          <Container />
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;
