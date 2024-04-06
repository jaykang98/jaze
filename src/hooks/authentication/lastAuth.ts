import { useCallback } from "react";
import {
  generateApiSignature,
} from "../security/encryptionProtocol";
import { reloadPage, currentPage } from "../security/urlHandler";
import { useLocalStorage } from "../utils/useLocalStorage";
import { fetchUserData } from "../dataManagement/fetchUserData";
export const lastAuth = () => {
  const callbackUrl = encodeURIComponent(currentPage());
    const { removeItem: removeLastFMData, setItem: setLastFMUserID, setItem: setUserData, getItem  } = useLocalStorage();
    const getLastFMUser = getItem("getLastFMUser");
    const isFMAuthenticated = useCallback(() => getLastFMUser !== null, [getLastFMUser]);

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
            process.env.REACT_APP_LASTFM_SECRETKEY,
        );

        const sessionUrl = `${process.env.REACT_APP_LASTFM_BASEURL}?method=auth.getSession&api_key=${process.env.REACT_APP_LASTFM_APIKEY}&token=${token}&api_sig=${apiSig}&format=json`;

        try {
            const response = await fetch(sessionUrl);
            if (!response.ok)
                throw new Error(`Network response was not ok: ${response.statusText}`);
            const data = await response.json();

            if (data.session) {
                setLastFMUserID("lastFMUserID", data.session.name);
            }
        } catch (error) {
            console.error("Fetching session failed:", error);
        }
    };

    const logFMOut = async() => {
        removeLastFMData("lastFMUserID");
        reloadPage();
    };


  return {
    startAuthFM,
    fetchFM,
    logFMOut,
    getLastFMUser,
    isFMAuthenticated,
  };
};
