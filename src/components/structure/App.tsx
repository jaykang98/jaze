import React from "react";
import "../../globals/globalStyles.css";
import "../../globals/textStyles.css";
import { BrowserRouter as Router } from "react-router-dom";
import ViewConstructor from "./viewConstructor/ViewConstructor";
import ErrorBoundary from "./ErrorBoundary";
import { lastAuth } from "../../hooks/authentication/lastAuth";
import { spotAuth } from "../../hooks/authentication/spotAuth";
import Header from "../foundations/header/Header";
import Footer from "../foundations/footer/Footer";
import { ViewTitleProvider } from "../../contexts/ViewTitleContexts";
import { useLocalStorage } from "../../hooks/utils/useLocalStorage";
import { fetchUserData } from "../../hooks/dataManagement/fetchUserData";
function App() {
  const { getItem } = useLocalStorage();
  const { fetchFM } = lastAuth();
  const { fetchSpotifyCode } = spotAuth();

    const lastFMUserID = getItem("lastFMUser");

    if (lastFMUserID == null) {
        const token = new URLSearchParams(window.location.search).get("token");
        if (token) {
            fetchFM(token);
        }
    }
    else if (JSON.parse(getItem("lastFMUserData"))?.user?.name == null) {
        fetchUserData(lastFMUserID);
    }
    if (getItem("getSpotifyUser") == null && getItem("spotifyCode")==null) {
        const code = new URLSearchParams(window.location.search).get("code");
        code!=null ? fetchSpotifyCode(code): "";
    }

  return (
    <ViewTitleProvider>
      <ErrorBoundary>
        <Header />
        <div className="app">
          <Router>
            <ViewConstructor onViewChange={() => {}} />
          </Router>
        </div>
        <Footer />
      </ErrorBoundary>
    </ViewTitleProvider>
  );
}

export default App;
