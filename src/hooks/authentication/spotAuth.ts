import { useState, useEffect, useCallback } from "react";
import { generateRandomString } from "../security/encryptionProtocol";
import { Buffer } from "buffer";
import { currentPage, reloadPage } from "../security/urlHandler";
import { useLocalStorage } from "../utils/useLocalStorage";
import { fetchUserData } from "../dataManagement/fetchUserData";

export const spotAuth = () => {
    const [spotifyUserID, setSpotifyUserID] = useState<string | null>(null);
    const { getItem, setItem, removeItem } = useLocalStorage();

    const logSpotifyOut = useCallback(() => {
        const keys = [
            "SpotifyUserID",
            "spotifyCode",
            "SpotifyAccessToken",
            "SpotifyRefreshToken",
            "SpotifyTokenExpiry",
        ];
        keys.forEach(removeItem);
        setSpotifyUserID(null);
        reloadPage();
    }, [removeItem, setSpotifyUserID]);

    const isSpotifyLoggedIn = useCallback(() => spotifyUserID !== null, [spotifyUserID]);

    const startAuthSpotify = useCallback(() => {
        const scope = encodeURIComponent("user-read-private user-read-email");
        const state = generateRandomString(16);
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENTID}&response_type=code&redirect_uri=${currentPage()}&scope=${scope}&state=${state}`;
    }, []);

    const fetchSpotifyCode = useCallback(async (code: string) => {
        setItem("spotifyCode", code);
        try {
            const authBuffer = Buffer.from(`${process.env.REACT_APP_SPOTIFY_CLIENTID}:${process.env.REACT_APP_SPOTIFY_CLIENTSECRET}`).toString("base64");
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    Authorization: `Basic ${authBuffer}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    code,
                    redirect_uri: currentPage(),
                }).toString(),
            });

            if (!response.ok) {
                throw new Error("Failed to exchange Spotify code for token");
            }

            const { access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn } = await response.json();

            if (accessToken) {
                const profileResponse = await fetch("https://api.spotify.com/v1/me", {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                if (!profileResponse.ok) {
                    throw new Error("Failed to fetch Spotify user profile.");
                }
                const userProfile = await profileResponse.json();
                const response = JSON.stringify(userProfile);
                await fetchUserData("Spotify", response);

                setItem("SpotifyAccessToken", accessToken);
                setItem("SpotifyRefreshToken", refreshToken);
                setItem("SpotifyTokenExpiry", expiresIn.toString());
                setItem("SpotifyUserID", userProfile.id);
                setItem("SpotifyUserRealName", userProfile.display_name);
                setItem("SpotifyUserData", JSON.stringify(userProfile));
                setSpotifyUserID(userProfile.id);
            }
        } catch (error) {
            console.error("Error handling Spotify auth code:", error);
        }
    }, [setItem, setSpotifyUserID]);

    useEffect(() => {
        const localSpotifyUser = getItem("SpotifyUserID");
        if (localSpotifyUser) {
            setSpotifyUserID(localSpotifyUser);
        }
    }, [getItem, setSpotifyUserID]);

    return {
        startAuthSpotify,
        fetchSpotifyCode,
        logSpotifyOut,
        spotifyUserID,
        isSpotifyLoggedIn,
    };
};
