import { useState, useEffect, useCallback } from "react";
import {decryptData,encryptData,generateRandomString} from "../security/encryptionProtocol";
import { Buffer } from "buffer";
import { currentPage, reloadPage } from "../security/urlHandler";

export const spotAuth = () => {
  const [spotifyUserID, spotifyIDState] = useState<string | null>(null);
  const startAuthSpotify = () => {
    const scope = encodeURIComponent("user-read-private user-read-email");
    const state = generateRandomString(16);
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENTID}&response_type=code&redirect_uri=${encodeURIComponent(currentPage()) }&scope=${scope}&state=${state}`;
  };
    const fetchSpotifyCode = async (code: string) => {
        localStorage.setItem("spotifyCode", code);
        try {
            const authBuffer = Buffer.from(`${process.env.REACT_APP_SPOTIFY_CLIENTID}:${process.env.REACT_APP_SPOTIFY_CLIENTSECRET}`).toString("base64");
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    'Authorization': 'Basic ' + authBuffer,
                    'content-type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
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
                localStorage.setItem("SpotifyAccessToken", accessToken);
                localStorage.setItem("SpotifyRefreshToken", refreshToken);
                localStorage.setItem("SpotifyTokenExpiry", expiresIn.toString());
                const userProfile = await fetch("https://api.spotify.com/v1/me", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }).then((res) => res.json());

                const userID = userProfile.id;
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
    localStorage.removeItem("spotifyCode");
    localStorage.removeItem("SpotifyAccessToken");
    localStorage.removeItem("SpotifyRefreshToken");
    localStorage.removeItem("SpotifyTokenExpiry");
    spotifyIDState(null);
    reloadPage();
  }, []);
  const getSpotifyUser = useCallback(() => spotifyUserID, [spotifyUserID]);
  const isSpotifyLoggedIn = useCallback(
    () => spotifyUserID !== null,
    [spotifyUserID],
  );
  useEffect(() => {
      const localSpotifyUser = localStorage.getItem("SpotifyUserID");
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
    isSpotifyLoggedIn,
  };
};
