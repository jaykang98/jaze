// FileName: src/hooks/useAuthenticator.tsx
import { useState, useEffect, useCallback } from "react";
import { decryptData, encryptData, generateMD5 } from "./utils/SecurityUtils";

export const useAuthenticator = () => {
  const [userID, setUserIDState] = useState<string | null>(null);
  const subscribers = new Set<() => void>();

  const notifySubscribers = () => {
    subscribers.forEach((callback) => callback());
  };

  const subscribeToAuthChanges = useCallback((callback: () => void) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  }, []);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
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

    if (process.env.REACT_APP_IS_DEBUG === "TRUE") {
      console.log("Fetching session with request:", sessionUrl);
    }

    try {
      const response = await fetch(sessionUrl);
      if (!response.ok)
        throw new Error(`Network response was not ok: ${response.statusText}`);
      const data = await response.json();

      if (process.env.REACT_APP_IS_DEBUG === "TRUE") {
        console.log("Received session data:", data);
      }

      if (data.session) {
        const userID = data.session.name;
        const encryptedUserID = encryptData(userID);
        localStorage.setItem("userID", encryptedUserID);
        setUserIDState(userID);
          notifySubscribers();
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
    notifySubscribers();
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem("userID");
    setUserIDState(null);
      notifySubscribers();
      window.location.reload();
  }, []);

  const getUserID = useCallback(() => userID, [userID]);
  const isAuthenticated = useCallback(() => userID !== null, [userID]);

  return {
    subscribeToAuthChanges,
    startAuth,
    fetchSession,
    setUserID,
    getUserID,
    isAuthenticated,
    logOut,
  };
};
