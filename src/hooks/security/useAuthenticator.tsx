import { useState, useEffect, useCallback } from "react";
import { decryptData, encryptData, generateMD5 } from "./utils";
import { generateRandomString } from "../utils/authHelpers";

export const useAuthenticator = () => {
  const handleSpotifyAuthCode = async (code: string) => {
    try {
      const response = await fetch("/api/spotify-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error("Failed to exchange Spotify code for token");
      }

      const { userID } = await response.json();
      if (userID) {
        const encryptedUserID = encryptData(userID);
        localStorage.setItem("spotifyUserID", encryptedUserID);
        setUserIDState(userID);
      }
    } catch (error) {
      console.error("Error handling Spotify auth code:", error);
    }
  };
  const [userID, setUserIDState] = useState<string | null>(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem("lastFMUserID");
    if (storedUserID) {
      const decryptedUserID = decryptData(storedUserID);
      setUserIDState(decryptedUserID);
    }
  }, []);

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

  const startAuthFM = () => {
    let url = new URL(window.location.href);
    url.search = "";
    const callbackUrl = encodeURIComponent(url.toString());
    const authUrl = `http://www.last.fm/api/auth/?api_key=${process.env.REACT_APP_APIKEY}&cb=${callbackUrl}`;
    window.location.href = authUrl;
  };

  const startAuthSpotify = () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENTID;
    let url = new URL(window.location.href);
    url.search = "";
    const callbackUrl = encodeURIComponent(url.toString());
    const scope = encodeURIComponent("user-read-private user-read-email");
    const state = generateRandomString(16);
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${callbackUrl}&scope=${scope}&state=${state}`;

    window.location.href = spotifyAuthUrl;
  };

  const fetchFM = async (token: string) => {
    const apiSig = generateApiSignature(
      {
        api_key: process.env.REACT_APP_APIKEY!,
        method: "auth.getSession",
        token: token,
      },
      process.env.REACT_APP_SECRETKEY!,
    );

    const sessionUrl = `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&api_key=${process.env.REACT_APP_APIKEY}&token=${token}&api_sig=${apiSig}&format=json`;

    try {
      const response = await fetch(sessionUrl);
      if (!response.ok)
        throw new Error(`Network response was not ok: ${response.statusText}`);
      const data = await response.json();

      if (data.session) {
        const userID = data.session.name;
        const encryptedUserID = encryptData(userID);
        localStorage.setItem("lastFMUserID", encryptedUserID);
        setUserIDState(userID);
        window.location.reload();
      }
    } catch (error) {
      console.error("Fetching session failed:", error);
    }
  };

  const setLastFMUserID = useCallback((userID: string) => {
    const encryptedUserID = encryptData(userID);
    localStorage.setItem("lastFMUserID", encryptedUserID);
    setUserIDState(userID);
  }, []);

  const logFMOut = useCallback(() => {
    localStorage.removeItem("lastFMUserID");
    setUserIDState(null);
    window.location.reload();
  }, []);

  const getLastFMUserID = useCallback(() => userID, [userID]);
  const isFMAuthenticated = useCallback(() => userID !== null, [userID]);

  return {
    startAuthFM,
    fetchFM,
    getLastFMUserID,
    isFMAuthenticated,
    logFMOut,

    startAuthSpotify,

    handleSpotifyAuthCode,
  };
};
