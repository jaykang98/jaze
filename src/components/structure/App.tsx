import React from "react";
import "../../globals/globalStyles.css";
import "../../globals/textStyles.css";
import { BrowserRouter as Router } from "react-router-dom";
import ViewConstructor from "./viewConstructor/ViewConstructor";
import ErrorBoundary from "./ErrorBoundary";
import Header from "../foundations/header/Header";
import Footer from "../foundations/footer/Footer";
import JaZeAuth from "../../hooks/authentication/jazeAuth";
import { ViewTitleProvider } from "../../contexts/ViewTitleContexts";
import { useLocalStorage } from "../../hooks/utils/useLocalStorage";

function App() {
    const { getItem } = useLocalStorage();
    const [lastFmObject, spotifyObject] = JaZeAuth();

    const fetchFM = lastFmObject.fetchFM;
    const fetchSpotifyCode = spotifyObject.fetchSpotifyCode;
    const lastFMUserID = getItem("lastFMUser");

    if (lastFMUserID == null) {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
        fetchFM(token);
    }
    } 
    if (getItem("getSpotifyUser") == null && getItem("spotifyCode") == null) {
    const code = new URLSearchParams(window.location.search).get("code");
    code != null ? fetchSpotifyCode(code) : "";
    }

  return (
    <ViewTitleProvider>
      <ErrorBoundary>
        <Header />
        <div className="app">
          <Router>
            <ViewConstructor/>
          </Router>
        </div>
        <Footer />
      </ErrorBoundary>
    </ViewTitleProvider>
  );
}

export default App;
