import { useState, useEffect } from "react";
import { fetchAndProcessData } from "./fetchAndProcessData";
import { UserData, AlbumData, ArtistData, TrackData } from "types/dataTypes";
import { decryptData, encryptData } from "../security/utils";

export const fetchUserData = (username: string) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [trackData, setTrackData] = useState<TrackData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const isDebugMode = process.env.REACT_APP_IS_DEBUG === "TRUE";

  useEffect(() => {
    const localStorageKey = `userData_${username}`;
    const fetchData = async () => {
      setLoading(true);
      try {
        const storedDataStr = localStorage.getItem(localStorageKey);
        const storedData: StoredUserData = storedDataStr ? JSON.parse(isDebugMode ? storedDataStr : decryptData(storedDataStr)) : {};

        if (storedData) {
          setUserData(storedData.userData || null);
          setAlbumData(storedData.albumData || null);
          setArtistData(storedData.artistData || null);
          setTrackData(storedData.trackData || null);
          setLoading(false);
          return; 
        }

        const userInfo = await fetchAndProcessData("user.getinfo", { user: username });
        const userTopAlbums = await fetchAndProcessData("user.getTopAlbums", { user: username, limit: 5 });
        const userTopArtists = await fetchAndProcessData("user.getTopArtists", { user: username, limit: 5 });
        const userTopTracks = await fetchAndProcessData("user.getTopTracks", { user: username, limit: 5 });

        setUserData(userInfo as UserData);
        setAlbumData(userTopAlbums as AlbumData);
        setArtistData(userTopArtists as ArtistData);
        setTrackData(userTopTracks as TrackData);

        const dataToStore = JSON.stringify({ userData: userInfo, albumData: userTopAlbums, artistData: userTopArtists, trackData: userTopTracks });
        localStorage.setItem(localStorageKey, isDebugMode ? dataToStore : encryptData(dataToStore));
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
