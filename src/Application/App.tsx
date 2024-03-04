// FileName: src/App.tsx
import React, { useEffect } from "react";
import styles from "./App.module.css";
import { BrowserRouter as Router } from "react-router-dom";
import ActivityFrame from "../components/foundations/activityFrame/ActivityFrame";
import ErrorBoundary from "./ErrorBoundary";
import { useAuthenticator } from "../hooks/useAuthenticator";
import Header from "../components/foundations/header/Header";
import Footer from "../components/foundations/footer/Footer"
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
      <Header></Header>
      <div className={styles.appContainer}>
        <Router>
          <ActivityFrame userID={getUserID()} onViewChange={() => {}} />
        </Router>
      </div>
      <Footer></Footer>
    </ErrorBoundary>
  );
}

export default App;
