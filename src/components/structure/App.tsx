import React, { useEffect } from "react";
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
function App() {
  const { fetchSpotifyCode, getSpotifyUser } = spotAuth();
  const { getLastFMUser, fetchFM } = lastAuth();

  useEffect(() => {
    if (!getLastFMUser) {
      const token = new URLSearchParams(window.location.search).get("token");
      if (token) {
        fetchFM(token);
      }
    }

    if (!getSpotifyUser) {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        fetchSpotifyCode(code);
      }
    }
  }, [fetchFM, getLastFMUser, fetchSpotifyCode, getSpotifyUser]);

  return (
    <ViewTitleProvider>
      <ErrorBoundary>
        <Header />
        <div className="app">
          <Router>
            <ViewConstructor
              lastFMUser={getLastFMUser}
              spotifyUser={getSpotifyUser}
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
