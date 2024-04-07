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

    const startAuthFM = (): void => {
        window.location.href = `http://www.last.fm/api/auth/?api_key=${process.env.REACT_APP_LASTFM_APIKEY}&cb=${encodeURIComponent(currentPage()) }`;
    };

    const fetchFM = async (token: string): Promise<void> => {
        const apiSig = generateApiSignature({
            api_key: process.env.REACT_APP_LASTFM_APIKEY!,
            method: "auth.getSession",
            token: token,
        }, process.env.REACT_APP_LASTFM_SECRETKEY);

        try {
            const response = await fetch(`${process.env.REACT_APP_LASTFM_BASEURL}?method=auth.getSession&api_key=${process.env.REACT_APP_LASTFM_APIKEY}&token=${token}&api_sig=${apiSig}&format=json`);
            if (!response.ok)
                throw new Error(`Network response was not ok: ${response.statusText}`);
            const data = await response.json();
            fetchUserData(data.session.name);
            if (data.session) {
                setItem("lastFMUserID", data.session.name);
            }
            
        } catch (error) {
            console.error("Fetching session failed:", error);
        }

    };

    const logFMOut = (): void => {
        removeItem("lastFMUserID");
        removeItem("lastFMAlbumData");
        removeItem("lastFMArtistData");
        removeItem("lastFMTrackData");
        removeItem("lastFMUserData");
        reloadPage();
    };

    return {
        startAuthFM,
        fetchFM,
        logFMOut,
        isFMAuthenticated,
    };
};
