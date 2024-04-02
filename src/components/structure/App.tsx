import React, { useEffect } from "react";
import "../../globals/globalStyles.css";
import "../../globals/textStyles.css";
import { BrowserRouter as Router } from "react-router-dom";
import ViewConstructor from "./viewConstructor/ViewConstructor";
import ErrorBoundary from "./ErrorBoundary";
import { useAuthenticator } from "../../hooks/security/useAuthenticator";
import Header from "../foundations/header/Header";
import Footer from "../foundations/footer/Footer";
import { ViewTitleProvider } from "../../contexts/ViewTitleContexts";
import { useLocalStorage } from "../../hooks/utils/useLocalStorage";
function App() {
    const { fetchFM, getLastFMUser, fetchSpotifyCode } =
    useAuthenticator();
  const { getItem } = useLocalStorage("spotifyUserID");
  const spotID = { getItem };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

      if (!getLastFMUser()) {
      const token = urlParams.get("token");
      if (token) {
        fetchFM(token);
      }
    }

    if (spotID!=null) {
      const code = urlParams.get("code");
      if (code) {
          fetchSpotifyCode(code);
      }
    }
  }, [fetchFM, getLastFMUser, fetchSpotifyCode]);

  return (
    <ViewTitleProvider>
      <ErrorBoundary>
        <Header />
        <div className="app">
          <Router>
            <ViewConstructor
                          userID={getLastFMUser()}
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
