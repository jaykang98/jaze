import { useState, useEffect, useCallback } from "react";
import { decryptData, encryptData, generateMD5, generateRandomString } from "../security/encryptionProtocol";
import { Buffer } from 'buffer';

export const spotAuth = () => {
    const baseUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    const callbackUrl = encodeURIComponent(baseUrl);

    const [spotifyUserID, spotifyIDState] = useState<string | null>(null);
    const startAuthSpotify = () => {
        const scope = encodeURIComponent("user-read-private user-read-email");
        const state = generateRandomString(16);
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENTID}&response_type=code&redirect_uri=${callbackUrl}&scope=${scope}&state=${state}`;
    };
    const fetchSpotifyCode = async (code: string) => {
        localStorage.setItem("spotifyCode", code);
        try {
            const authBuffer = Buffer.from(`${process.env.REACT_APP_SPOTIFY_CLIENTID}:${process.env.REACT_APP_SPOTIFY_CLIENTSECRET}`).toString('base64');
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    'Authorization': 'Basic ' + authBuffer,
                    'content-type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: callbackUrl
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to exchange Spotify code for token");
            }

            const { userID } = await response.json();
            if (userID) {
                const encryptedUserID = encryptData(userID);
                localStorage.setItem("SpotifyUserID", encryptedUserID);
                spotifyIDState(userID);
            }
        } catch (error) {
            console.error("Error handling Spotify auth code:", error);
        }
    };
    const logSpotifyOut = useCallback(() => {
        localStorage.removeItem("SpotifyUserID");
        spotifyIDState(null);
        window.location.reload();
    }, []);
    const getSpotifyUser = useCallback(() => spotifyUserID, [spotifyUserID]);
    const isSpotifyLoggedIn = useCallback(() => spotifyUserID !== null, [spotifyUserID]);
    useEffect(() => {
        const localSpotifyUser = localStorage.getItem("lastFMUserID");
        if (localSpotifyUser) {
            const decryptedUserID = decryptData(localSpotifyUser);
            spotifyIDState(decryptedUserID);
        }
    }, []);

    return {
        startAuthSpotify,
        fetchSpotifyCode,
        logSpotifyOut,
        getSpotifyUser,
        isSpotifyLoggedIn
    };
};
