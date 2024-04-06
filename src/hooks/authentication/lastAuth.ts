import { useState, useEffect, useCallback } from "react";
import {
  generateApiSignature,
} from "../security/encryptionProtocol";
import { reloadPage, currentPage } from "../security/urlHandler";
import { useLocalStorage } from "../utils/useLocalStorage";

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
                const { setItem: setLastFMUserID } = useLocalStorage("lastFMUserID");
                setLastFMUserID(lastFMUserID);
                lastFMUserIDState(lastFMUserID);
                reloadPage();
            }
        } catch (error) {
            console.error("Fetching session failed:", error);
        }
    };

  const logFMOut = useCallback(() => {
    const { removeItem: removeLastFMData } = useLocalStorage("lastFMData");
    removeLastFMData();

    const { removeItem: removeLastFMUserID } = useLocalStorage("lastFMUserID");
    removeLastFMUserID();
    lastFMUserIDState(null);
    reloadPage();
  }, []);
  const getLastFMUser = useCallback(() => lastFMUserID, [lastFMUserID]);
  const isFMAuthenticated = useCallback(
    () => lastFMUserID !== null,
    [lastFMUserID],
  );
    useEffect(() => {
        const { getItem: getLastFMUser } = useLocalStorage("lastFMUserID");
        const localLastFMUser = getLastFMUser();
        if (localLastFMUser) {
            lastFMUserIDState(localLastFMUser); 
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
