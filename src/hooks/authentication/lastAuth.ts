import { useState, useEffect, useCallback } from "react";
import {
  decryptData,
  encryptData,
  generateApiSignature,
} from "../security/encryptionProtocol";
import { reloadPage, currentPage } from "../security/urlHandler";

export const lastAuth = () => {
    const callbackUrl = encodeURIComponent(currentPage());

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
          reloadPage();
      }
    } catch (error) {
      console.error("Fetching session failed:", error);
    }
  };
  const logFMOut = useCallback(() => {
      localStorage.removeItem("lastFMData");
      localStorage.removeItem("lastFMUserID");
    lastFMUserIDState(null);
    reloadPage();
  }, []);
  const getLastFMUser = useCallback(() => lastFMUserID, [lastFMUserID]);
  const isFMAuthenticated = useCallback(
    () => lastFMUserID !== null,
    [lastFMUserID],
  );
  useEffect(() => {
    const localLastFMUser = localStorage.getItem("lastFMUserID");
    if (localLastFMUser) {
      const decryptedUserID = decryptData(localLastFMUser);
      lastFMUserIDState(decryptedUserID);
    }
  }, []);

  return {
    startAuthFM,
    fetchFM,
    logFMOut,
    getLastFMUser,
    isFMAuthenticated,
  };
};
