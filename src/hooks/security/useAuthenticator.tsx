import { useState, useEffect, useCallback } from "react";
import { decryptData, encryptData, generateMD5 } from "./utils";
const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const useAuthenticator = () => {
    const handleSpotifyAuthCode = async (code: string) => {
        try {
            const response = await fetch('/api/spotify-auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                throw new Error('Failed to exchange Spotify code for token');
            }

            const { userID } = await response.json();
            if (userID) {
                const encryptedUserID = encryptData(userID);
                localStorage.setItem("spotifyUserID", encryptedUserID);
                setUserIDState(userID); // Consider if you need separate state management for Spotify user ID
            }
        } catch (error) {
            console.error('Error handling Spotify auth code:', error);
        }
    };
    const [userID, setUserIDState] = useState<string | null>(null);

    useEffect(() => {
        const storedUserID = localStorage.getItem("userID");
        if (storedUserID) {
            const decryptedUserID = decryptData(storedUserID);
            setUserIDState(decryptedUserID);
        }
    }, []);

    const generateApiSignature = (params: { [key: string]: string }, secret: string) => {
        const orderedParams = Object.keys(params).sort().map((key) => `${key}${params[key]}`).join("");
        return generateMD5(`${orderedParams}${secret}`);
    };

    const startAuth = () => {
        const callbackUrl = encodeURIComponent(window.location.href);
        const authUrl = `http://www.last.fm/api/auth/?api_key=${process.env.REACT_APP_APIKEY}&cb=${callbackUrl}`;
        window.location.href = authUrl;
    };

    const startAuthSpotify = () => {
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID; 
        const redirectUri = encodeURIComponent(`${window.location.origin}/spotify-callback`); 
        const scope = encodeURIComponent('user-read-private user-read-email'); 
        const state = generateRandomString(16); 
        const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

        window.location.href = spotifyAuthUrl;
    };

    const fetchSession = async (token: string) => {
        const apiSig = generateApiSignature({ api_key: process.env.REACT_APP_APIKEY!, method: "auth.getSession", token: token }, process.env.REACT_APP_SECRETKEY!);

        const sessionUrl = `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&api_key=${process.env.REACT_APP_APIKEY}&token=${token}&api_sig=${apiSig}&format=json`;

        try {
            const response = await fetch(sessionUrl);
            if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
            const data = await response.json();

            if (data.session) {
                const userID = data.session.name;
                const encryptedUserID = encryptData(userID);
                localStorage.setItem("userID", encryptedUserID);
                setUserIDState(userID);
                window.location.reload();
            }
        } catch (error) {
            console.error("Fetching session failed:", error);
        }
    };

    const setUserID = useCallback((userID: string) => {
        const encryptedUserID = encryptData(userID);
        localStorage.setItem("userID", encryptedUserID);
        setUserIDState(userID);
    }, []);

    const logOut = useCallback(() => {
        localStorage.removeItem("userID");
        setUserIDState(null);
        window.location.reload();
    }, []);

    const getUserID = useCallback(() => userID, [userID]);
    const isAuthenticated = useCallback(() => userID !== null, [userID]);

    return {
        startAuth,
        startAuthSpotify, 
        fetchSession,
        setUserID,
        getUserID,
        isAuthenticated,
        logOut,
        handleSpotifyAuthCode,
    };
};
