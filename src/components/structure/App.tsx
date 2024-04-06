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
function App() {
    const { getItem } = useLocalStorage();
    const { fetchFM } = lastAuth();
    const { fetchSpotifyCode } = spotAuth();

    const getLastFMUser = getItem("getLastFMUser");
    const getSpotifyUser = getItem("getSpotifyUser");

    const token = new URLSearchParams(window.location.search).get("token");
    const code = new URLSearchParams(window.location.search).get("code");
    if (getLastFMUser) {
        return;
    }
    else if (token) {
        fetchFM(token);
    }
    if (getSpotifyUser) {
        return;
    }
    else if (code) {
        fetchSpotifyCode(code);
    }
    

  return (
    <ViewTitleProvider>
      <ErrorBoundary>
        <Header />
        <div className="app">
          <Router>
            <ViewConstructor
              onViewChange={() => {}}
            />
          </Router>
        </div>
        <Footer />
      </ErrorBoundary>
    </ViewTitleProvider>
  );
}

export default App;
