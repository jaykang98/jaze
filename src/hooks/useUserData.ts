// FileName: src/hooks/useUserData.ts
import { useState, useEffect } from "react";
import { fetchAndProcessData } from "./utils/dataHandler";
import { AlbumData, ArtistData, TrackData } from "types/dataTypes"
export const useUserData = (username: string) => {
    const [UserData, setUserInfo] = useState<AlbumData | null>(null);
    const [AlbumData, setUserTopAlbums] = useState<AlbumData | null>(null);
    const [ArtistData, setUserTopArtists] = useState<ArtistData | null>(null);
    const [TrackData, setUserTopTracks] = useState<TrackData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!username) return;

        const fetchData = async (method: string, params: object) => {
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
            const UserData = await fetchData("user.getinfo", { user: username });
            setUserInfo(UserData);
        };

        const fetchUserTopAlbums = async () => {
            const AlbumData = await fetchData("user.getTopAlbums", {
                user: username,
                limit: 5,
                period: "12month",
            }) as AlbumData;
            setUserTopAlbums(AlbumData);
        };

        const fetchUserTopArtists = async () => {
            const ArtistData = await fetchData("user.getTopArtists", {
                user: username,
                limit: 5,
            }) as ArtistData;
            setUserTopArtists(ArtistData);
        };

        const fetchUserTopTracks = async () => {
            const TrackData = await fetchData("user.getTopTracks", {
                user: username,
                limit: 5,
            }) as TrackData;
            setUserTopTracks(TrackData);
        };

        fetchUserInfo();
        fetchUserTopAlbums();
        fetchUserTopArtists();
        fetchUserTopTracks();
    }, [username]);

    return {
        UserData,
        AlbumData,
        ArtistData,
        TrackData,
        error,
    };
};
