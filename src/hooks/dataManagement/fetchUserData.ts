import { useState, useEffect } from "react";
import { fetchAndProcessData } from "../apis/lastFM_API";
import { lastFMUser, AlbumData, ArtistData, TrackData } from "types/dataTypes";
import { useLocalStorage } from "../utils/useLocalStorage";

export const fetchUserData = (username: string) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
    const { getItem: getLastFMData, setItem: setLastFMData } = useLocalStorage();
    const { setItem: setUserData, setItem: setAlbumData, setItem: setArtistData, setItem: setTrackData, getItem } = useLocalStorage();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
          const storedDataStr = getLastFMData("lastFMData");
        if (storedDataStr) {
          const storedData = JSON.parse(storedDataStr);
          if (storedData) {
              getItem("lastFMUserData" );
              getItem("lastFMAlbumData" );
              getItem("lastFMArtistData" );
              getItem("lastFMTrackData" );
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

          setUserData("lastFMUserData", JSON.stringify(userData));
          setAlbumData("lastFMAlbumData", JSON.stringify(userAlbums));
          setArtistData("lastFMArtistData", JSON.stringify(userArtists));
          setTrackData("lastFMTrackData", JSON.stringify(userTracks));

        const dataToStore = JSON.stringify({
          userData: userData,
          albumData: userAlbums,
          artistData: userArtists,
          trackData: userTracks,
        });
          setLastFMData("lastFMData", dataToStore);

          
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
    error,
    loading,
  };
};
