// fetchUserData.ts

import { useState, useEffect } from "react";
import { fetchAndProcessData } from "./fetchAndProcessData";
import { UserData, AlbumData, ArtistData, TrackData } from "types/dataTypes";
import { decryptData, encryptData } from "../security/utils";

interface GlobalSettings {
    isDecryptMode: boolean;
}

const settings: GlobalSettings = {
    isDecryptMode: false, 
};

export const getIsDecryptMode = () => settings.isDecryptMode;
export const setIsDecryptMode = (mode: boolean) => {
    settings.isDecryptMode = mode;
};

interface StoredUserData {
    userData?: UserData;
    albumData?: AlbumData;
    artistData?: ArtistData;
    trackData?: TrackData;
}

export const fetchUserData = (username: string) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [albumData, setAlbumData] = useState<AlbumData | null>(null);
    const [artistData, setArtistData] = useState<ArtistData | null>(null);
    const [trackData, setTrackData] = useState<TrackData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const isDebugMode = process.env.REACT_APP_IS_DEBUG === "TRUE";
    const isDecryptMode = getIsDecryptMode(); 

    useEffect(() => {
        const localStorageKey = `userData_${username}`;
        const fetchData = async () => {
            setLoading(true);
            try {
                const storedDataStr = localStorage.getItem(localStorageKey);
                let storedData: StoredUserData = {};


                if (storedDataStr) {
                    try {
                        const processedDataStr = isDebugMode || !isDecryptMode ? storedDataStr : decryptData(storedDataStr);
                        storedData = JSON.parse(processedDataStr);
                    } catch (parseError) {
                        console.error("Error parsing or decrypting stored user data", parseError);
                    }
                }

                const userInfo = await fetchAndProcessData("user.getinfo", { user: username });
                const userTopAlbums = await fetchAndProcessData("user.getTopAlbums", { user: username, limit: 10 });
                const userTopArtists = await fetchAndProcessData("user.getTopArtists", { user: username, limit: 10 });
                const userTopTracks = await fetchAndProcessData("user.getTopTracks", { user: username, limit: 10 });

                setUserData(userInfo as UserData);
                setAlbumData(userTopAlbums as AlbumData);
                setArtistData(userTopArtists as ArtistData);
                setTrackData(userTopTracks as TrackData);

                const dataToStore = JSON.stringify({
                    userData: userInfo,
                    albumData: userTopAlbums,
                    artistData: userTopArtists,
                    trackData: userTopTracks
                });

                localStorage.setItem(localStorageKey, isDebugMode || !isDecryptMode ? dataToStore : encryptData(dataToStore));
            } catch (error) {
                console.error("Failed to fetch user data", error);
                setError("Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [username, isDebugMode]);

    return { userData, albumData, artistData, trackData, error, loading };
};
