// FileName: src/hooks/useAuthenticator.tsx
import { useState, useEffect } from "react";
import { decryptData, encryptData, generateMD5 } from "./utils/SecurityUtils";

export const useAuthenticator = () => {
  const [userID, setUserIDState] = useState<string | null>(null);

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

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    if (storedUserID) {
      const decryptedUserID = decryptData(storedUserID);
      setUserIDState(decryptedUserID);
    }
  }, []);

  const startAuth = () => {
    const callbackUrl = encodeURIComponent(window.location.href);
    const authUrl = `http://www.last.fm/api/auth/?api_key=${process.env.REACT_APP_APIKEY}&cb=${callbackUrl}`;
    window.location.href = authUrl;
  };

  const fetchSession = async (token: string) => {
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
        localStorage.setItem("userID", encryptedUserID);
        setUserIDState(userID);
      }
    } catch (error) {
      console.error("Fetching session failed:", error);
    }
  };

  const setUserID = (userID: string) => {
    const encryptedUserID = encryptData(userID);
    localStorage.setItem("userID", encryptedUserID);
    setUserIDState(userID);
  };

  const getUserID = () => userID;
  const isAuthenticated = () => userID !== null;
  return { startAuth, fetchSession, setUserID, getUserID, isAuthenticated };
};
