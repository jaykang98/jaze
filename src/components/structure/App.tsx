// FileName: src/App.tsx
import React, { useEffect } from "react";
import styles from "src/types/App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import ActivityFrame from "./activityFrame/ActivityFrame";
import ErrorBoundary from "./ErrorBoundary";
import { useAuthenticator } from "../../hooks/security/useAuthenticator";
import Header from "../foundations/header/Header";
import Footer from "../foundations/footer/Footer";

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
      <Header />
      <div className={styles.appContainer}>
        <Router>
          <ActivityFrame userID={getUserID()} onViewChange={() => {}} />
        </Router>
      </div>
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
