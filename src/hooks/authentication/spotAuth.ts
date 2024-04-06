import { useState, useEffect, useCallback } from "react";
import { generateRandomString } from "../security/encryptionProtocol";
import { Buffer } from "buffer";
import { currentPage, reloadPage } from "../security/urlHandler";
import { useLocalStorage } from "../utils/useLocalStorage";

export const spotAuth = () => {
    const [spotifyUserID, setSpotifyUserID] = useState<string | null>(null);
    const logSpotifyOut = useCallback(() => {
        const keys = [
            "SpotifyUserID",
            "spotifyCode",
            "SpotifyAccessToken",
            "SpotifyRefreshToken",
            "SpotifyTokenExpiry",
        ];

        keys.forEach((key) => {
            const { removeItem } = useLocalStorage();
            removeItem(key);
        });

        setSpotifyUserID(null);
        reloadPage();
    }, []);
    const isSpotifyLoggedIn = useCallback(
        () => spotifyUserID !== null,
        [spotifyUserID],
    );

    const startAuthSpotify = () => {
        const scope = encodeURIComponent("user-read-private user-read-email");
        const state = generateRandomString(16);
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENTID}&response_type=code&redirect_uri=${currentPage()}&scope=${scope}&state=${state}`;
    };
    const fetchSpotifyCode = async (code: string) => {
        const { setItem: setSpotifyCode } = useLocalStorage();
        setSpotifyCode("spotifyCode", code);
        try {
            const authBuffer = Buffer.from(
                `${process.env.REACT_APP_SPOTIFY_CLIENTID}:${process.env.REACT_APP_SPOTIFY_CLIENTSECRET}`,
            ).toString("base64");
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    Authorization: "Basic " + authBuffer,
                    "content-type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: currentPage(),
                }).toString(),
            });

            if (!response.ok) {
                throw new Error("Failed to exchange Spotify code for token");
            }

            const data = await response.json();
            const accessToken = data.access_token;
            const refreshToken = data.refresh_token;
            const expiresIn = data.expires_in;

            if (accessToken) {
                const { setItem: setAccessToken } = useLocalStorage();
                setAccessToken("SpotifyAccessToken",accessToken);

                const { setItem: setRefreshToken } = useLocalStorage();
                setRefreshToken("SpotifyRefreshToken",refreshToken);

                const { setItem: setTokenExpiry } = useLocalStorage();
                setTokenExpiry("SpotifyTokenExpiry",expiresIn.toString());

                const userProfile = await fetch("https://api.spotify.com/v1/me", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }).then((res) => res.json());

                const { setItem: setSpotifyUserID } = useLocalStorage();
                setSpotifyUserID("SpotifyUserID",userProfile.id);
            }
        } catch (error) {
            console.error("Error handling Spotify auth code:", error);
        }
    };
    const { getItem } = useLocalStorage();
    const getSpotifyUser = getItem("SpotifyUserID");
    useEffect(() => {
        const localSpotifyUser = getItem("SpotifyUserID");
        if (localSpotifyUser) {
            setSpotifyUserID(localSpotifyUser);
        }
    }, []);

    return {
        startAuthSpotify,
        fetchSpotifyCode,
        logSpotifyOut,
        getSpotifyUser,
        isSpotifyLoggedIn,
    };
};