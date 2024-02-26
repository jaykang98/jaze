import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { decryptData, encryptData } from "./utils/SecurityUtils";

const apiKey = process.env.REACT_APP_APIKEY;
const baseUrl = "http://www.last.fm/api/auth/";

export const useAuthenticator = () => {
  const [userID, setUserIDState] = useState<string | null>(null);
  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    if (storedUserID) {
      const decryptedUserID = decryptData(storedUserID);
      setUserIDState(decryptedUserID);
    }
  }, []);

  const startAuth = () => {
    const callbackUrl = encodeURIComponent(window.location.href);
    const authUrl = `${baseUrl}?api_key=${apiKey}&cb=${callbackUrl}`;
    window.location.href = authUrl;
  };

  const fetchSession = async (token: string) => {
      const apiSigString = `api_key${apiKey}methodauth.getSessiontoken${token}${process.env.REACT_APP_SECRETKEY}`;
    const apiSig = CryptoJS.MD5(apiSigString).toString();
    const sessionUrl = `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&token=${token}&api_key=${apiKey}&api_sig=${apiSig}&format=json`;

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

  return { startAuth, fetchSession, setUserID, getUserID };
};
