// FileName: src/hooks/useUserData.ts
import { useState, useEffect } from "react";
import { fetchAndProcessData } from "./utils/dataHandler";

export const useUserData = (username: string) => {
    const [userInfo, setUserInfo] = useState<any | null>(null);
    const [userTopAlbums, setUserTopAlbums] = useState<any | null>(null);
    const [userTopArtists, setUserTopArtists] = useState<any | null>(null);
    const [userTopTracks, setUserTopTracks] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!username) return;

        const fetchData = async (method: string, params: object) => {
            try {
                // Debug: Print the request details if REACT_APP_IS_DEBUG is TRUE
                if (process.env.REACT_APP_IS_DEBUG === 'TRUE') {
                    console.log(`Fetching data with method: ${method}`, params);
                }

                const data = await fetchAndProcessData(method, params);

                // Debug: Print the received data if REACT_APP_IS_DEBUG is TRUE
                if (process.env.REACT_APP_IS_DEBUG === 'TRUE') {
                    console.log(`Received data for method: ${method}`, data);
                }

                return data;
            } catch (error) {
                console.error(`Failed to fetch data for method: ${method}`, error);
                setError(`Failed to fetch data for method: ${method}`);
                return null; // Ensure we return null on error to maintain state consistency
            }
        };

        const fetchUserInfo = async () => {
            const userInfo = await fetchData("user.getinfo", { user: username });
            setUserInfo(userInfo);
        };

        const fetchUserTopAlbums = async () => {
            const userTopAlbums = await fetchData("user.getTopAlbums", {
                user: username,
                limit: 5,
                period: "12month",
            });
            setUserTopAlbums(userTopAlbums);
        };

        const fetchUserTopArtists = async () => {
            const userTopArtists = await fetchData("user.getTopArtists", {
                user: username,
                limit: 5,
            });
            setUserTopArtists(userTopArtists);
        };

        const fetchUserTopTracks = async () => {
            const userTopTracks = await fetchData("user.getTopTracks", {
                user: username,
                limit: 5,
            });
            setUserTopTracks(userTopTracks);
        };

        fetchUserInfo();
        fetchUserTopAlbums();
        fetchUserTopArtists();
        fetchUserTopTracks();
    }, [username]);

    return {
        userInfo,
        userTopAlbums,
        userTopArtists,
        userTopTracks,
        error,
    };
};
