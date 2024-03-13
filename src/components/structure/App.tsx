import React, { useEffect } from "react";
import "../../globals/globalStyles.css";
import "../../globals/textStyles.css";
import { BrowserRouter as Router } from "react-router-dom"; 
import ViewConstructor from "./viewConstructor/ViewConstructor";
import ErrorBoundary from "./ErrorBoundary";
import { useAuthenticator } from "../../hooks/security/useAuthenticator";
import Header from "../foundations/header/Header";
import Footer from "../foundations/footer/Footer";
import { ViewTitleProvider } from '../../contexts/ViewTitleContexts';
import { useLocalStorage } from "../../hooks/utils/useLocalStorage";
function App() {
    const { fetchSession, getUserID, handleSpotifyAuthCode } = useAuthenticator();
    const { getItem } = useLocalStorage('spotifyUserID');
    const spotID = { getItem };
    useEffect(() => {

            const urlParams = new URLSearchParams(window.location.search);

            if (!getUserID()) {
                const token = urlParams.get("token");
                if (token) {
                    fetchSession(token);
                }
            }

            if (!spotID) {
                const code = urlParams.get("code");
                if (code) {
                    handleSpotifyAuthCode(code);
                }
            }
    }, [fetchSession, getUserID, handleSpotifyAuthCode]);

    return (
        <ViewTitleProvider>
            <ErrorBoundary>
                <Header />
                <div className="app">
                    <Router>
                        <ViewConstructor userID={getUserID()} onViewChange={() => { }} />
                    </Router>
                </div>
                <Footer />
            </ErrorBoundary>
        </ViewTitleProvider>
    );
}

export default App;
