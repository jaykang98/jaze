import { useState, useEffect } from "react";
import { fetchAndProcessData } from "./utils/dataHandler";
import { UserData, AlbumData, ArtistData, TrackData } from "types/dataTypes";
import { FetchDataParams, fetchData } from "./api/API"

export const useUserData = (username: string) => {
    fetchData;
    const [userData, setUserData] = useState<UserData | null>(null);
    const [albumData, setAlbumData] = useState<AlbumData | null>(null);
    const [artistData, setArtistData] = useState<ArtistData | null>(null);
    const [trackData, setTrackData] = useState<TrackData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!username) return;

        const fetchData = async (method: string, params: FetchDataParams) => {
            try {
                if (process.env.REACT_APP_IS_DEBUG === 'TRUE') {
                    console.log(`Fetching data with method: ${method}`, params);
                }
                const data = await fetchAndProcessData(method, params);
                if (process.env.REACT_APP_IS_DEBUG === 'TRUE') {
                    console.log(`Received data for method: ${method}`, data);
                }

                return data;
            } catch (error) {
                console.error(`Failed to fetch data for method: ${method}`, error);
                setError(`Failed to fetch data for method: ${method}`);
                return null;
            }
        };

        const fetchUserInfo = async () => {
            const userInfo = await fetchData("user.getinfo", { user: username }) as UserData;
            setUserData(userInfo);
        };

        const fetchUserTopAlbums = async () => {
            const userTopAlbums = await fetchData("user.getTopAlbums", {
                user: username,
                limit: 5,
                period: "12month",
            }) as AlbumData;
            setAlbumData(userTopAlbums);
        };

        const fetchUserTopArtists = async () => {
            const userTopArtists = await fetchData("user.getTopArtists", {
                user: username,
                limit: 5,
            }) as ArtistData;
            setArtistData(userTopArtists);
        };

        const fetchUserTopTracks = async () => {
            const userTopTracks = await fetchData("user.getTopTracks", {
                user: username,
                limit: 5,
            }) as TrackData;
            setTrackData(userTopTracks);
        };

        fetchUserInfo();
        fetchUserTopAlbums();
        fetchUserTopArtists();
        fetchUserTopTracks();
    }, [username]);

    return {
        userData,
        albumData,
        artistData,
        trackData,
        error,
    };
};