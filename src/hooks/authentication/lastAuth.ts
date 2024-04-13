import { useCallback } from "react";
import { generateApiSignature } from "../security/encryptionProtocol";
import { reloadPage, currentPage } from "../security/urlHandler";
import { useLocalStorage } from "../utils/useLocalStorage";
import { fetchUserData } from "../dataManagement/fetchUserData";

interface lastAuthReturn {
  startAuthFM: () => void;
  fetchFM: (token: string) => Promise<void>;
  logFMOut: () => void;
  isFMAuthenticated: () => boolean;
}

export const lastAuth = (): lastAuthReturn => {
  const { getItem, setItem, removeItem } = useLocalStorage();

  const isFMAuthenticated = useCallback(() => {
    const lastFMUser = getItem("lastFMUserID");
    return lastFMUser !== null;
  }, [getItem]);

  const startAuthFM = useCallback(() => {
    const authURL = `http://www.last.fm/api/auth/?api_key=${process.env.REACT_APP_LASTFM_APIKEY}&cb=${encodeURIComponent(currentPage())}`;
    window.location.href = authURL;
  }, []);

  const fetchFM = useCallback(
    async (token: string) => {
      const apiSig = generateApiSignature(
        {
          api_key: process.env.REACT_APP_LASTFM_APIKEY!,
          method: "auth.getSession",
          token,
        },
        process.env.REACT_APP_LASTFM_SECRETKEY,
      );

      try {
        const url = `${process.env.REACT_APP_LASTFM_BASEURL}?method=auth.getSession&api_key=${process.env.REACT_APP_LASTFM_APIKEY}&token=${token}&api_sig=${apiSig}&format=json`;
        const response = await fetch(url);

        if (!response.ok)
          throw new Error(
            `Network response was not ok: ${response.statusText}`,
          );

        const data = await response.json();

        if (data.session) {
          setItem("lastFMUserID", data.session.name);
          await fetchUserData("Last.FM", data.session.name);
        }
      } catch (error) {
        console.error("Fetching session failed:", error);
      }
    },
    [setItem],
  );

  const logFMOut = useCallback(() => {
    const keys = [
      "lastFMUserID",
      "lastFMAlbumData",
      "lastFMArtistData",
      "lastFMTrackData",
      "lastFMUserData",
    ];

    keys.forEach((key) => removeItem(key));
    reloadPage();
  }, [removeItem]);

  return {
    startAuthFM,
    fetchFM,
    logFMOut,
    isFMAuthenticated,
  };
};
