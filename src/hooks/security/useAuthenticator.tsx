import { useState, useEffect, useCallback } from "react";
import { decryptData, encryptData, generateMD5 } from "./utils";
import { generateRandomString } from "../utils/authHelpers";
import { Buffer } from 'buffer';

export const useAuthenticator = () => {
    const baseUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    const callbackUrl = encodeURIComponent(baseUrl);

    const generateApiSignature = (
    params: { [key: string]: string },
    secret: string,
    ) => {
        const orderedParams = Object.keys(params)
          .sort()
          .map((key) => `${key}${params[key]}`)
          .join("");
        return generateMD5(`${orderedParams}${secret}`);
    };

    const [lastFMUserID, lastFMUserIDState] = useState<string | null>(null);
    const startAuthFM = () => {
        window.location.href = `http://www.last.fm/api/auth/?api_key=${process.env.REACT_APP_LASTFM_APIKEY}&cb=${callbackUrl}`;
    };
    const fetchFM = async (token: string) => {
        const apiSig = generateApiSignature(
            {
                api_key: process.env.REACT_APP_LASTFM_APIKEY!,
                method: "auth.getSession",
                token: token,
            },
            process.env.REACT_APP_LASTFM_SECRET!,
        );

        const sessionUrl = `${process.env.REACT_APP_LASTFM_BASEURL}?method=auth.getSession&api_key=${process.env.REACT_APP_LASTFM_APIKEY}&token=${token}&api_sig=${apiSig}&format=json`;

        try {
            const response = await fetch(sessionUrl);
            if (!response.ok)
                throw new Error(`Network response was not ok: ${response.statusText}`);
            const data = await response.json();

            if (data.session) {
                const lastFMUserID = data.session.name;
                const encryptedUserID = encryptData(lastFMUserID);
                localStorage.setItem("lastFMUserID", encryptedUserID);
                lastFMUserIDState(lastFMUserID);
                window.location.reload();
            }
        } catch (error) {
            console.error("Fetching session failed:", error);
        }
    };
    const logFMOut = useCallback(() => {
        localStorage.removeItem("lastFMUserID");
        lastFMUserIDState(null);
        window.location.reload();
    }, []);
    const getLastFMUser = useCallback(() => lastFMUserID, [lastFMUserID]);
    const isFMAuthenticated = useCallback(() => lastFMUserID !== null, [lastFMUserID]);
    useEffect(() => {
        const localLastFMUser = localStorage.getItem("lastFMUserID");
        if (localLastFMUser) {
            const decryptedUserID = decryptData(localLastFMUser);
            lastFMUserIDState(decryptedUserID);
        }
    }, []);

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
                grant_type:'authorization_code',
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
            lastFMUserIDState(userID);
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
            lastFMUserIDState(decryptedUserID);
        }
    }, []);

    return {
        startAuthFM,
        fetchFM,
        logFMOut,
        getLastFMUser,
        isFMAuthenticated,
        startAuthSpotify,
        fetchSpotifyCode,
        logSpotifyOut,
        getSpotifyUser,
        isSpotifyLoggedIn
    };
};
