import React, { useEffect } from "react";
import "src/globals/globalStyles.css";
import "src/globals/textStyles.css";
import { BrowserRouter as Router } from "react-router-dom";
import ViewConstructor from "./viewConstructor/ViewConstructor";
import ErrorBoundary from "./ErrorBoundary";
import { useAuthenticator } from "../../hooks/security/useAuthenticator";
import Header from "../foundations/header/Header";
import Footer from "../foundations/footer/Footer";
import { ViewTitleProvider } from '../../contexts/ViewTitleContexts';

function App() {
    const { fetchSession, getUserID, handleSpotifyAuthCode } = useAuthenticator(); 

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (token && !getUserID()) {
            fetchSession(token);
        }

        const code = urlParams.get("code"); 
        if (code) {
            handleSpotifyAuthCode(code); 
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
