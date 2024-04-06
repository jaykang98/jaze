import { useState, useEffect } from "react";
import { fetchAndProcessData } from "../apis/lastFM_API";
import { lastFMUser, AlbumData, ArtistData, TrackData } from "types/dataTypes";
import { useLocalStorage } from "../utils/useLocalStorage";

export const fetchUserData = (username: string) => {
  const [userData, setUserData] = useState<lastFMUser | null>(null);
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [trackData, setTrackData] = useState<TrackData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { getItem: getLastFMData } = useLocalStorage("lastFMData");
        const storedDataStr = getLastFMData();
        if (storedDataStr) {
          const storedData = JSON.parse(storedDataStr);
          if (storedData) {
            setUserData(storedData.userData);
            setAlbumData(storedData.albumData);
            setArtistData(storedData.artistData);
            setTrackData(storedData.trackData);
            setLoading(false);
            return;
          }
        }

        const [userData, userAlbums, userArtists, userTracks] =
          await Promise.all([
            fetchAndProcessData("user.getinfo", { user: username }),
            fetchAndProcessData("user.getTopAlbums", {
              user: username,
              limit: 10,
            }),
            fetchAndProcessData("user.getTopArtists", {
              user: username,
              limit: 10,
            }),
            fetchAndProcessData("user.getTopTracks", {
              user: username,
              limit: 10,
            }),
          ]);

        setUserData(userData as lastFMUser);
        setAlbumData(userAlbums as AlbumData);
        setArtistData(userArtists as ArtistData);
        setTrackData(userTracks as TrackData);

        const dataToStore = JSON.stringify({
          userData: userData,
          albumData: userAlbums,
          artistData: userArtists,
          trackData: userTracks,
        });

        const { setItem: setLastFMData } = useLocalStorage("lastFMData");
        setLastFMData(dataToStore);
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return {
    userData,
    albumData,
    artistData,
    trackData,
    error,
    loading,
  };
};
