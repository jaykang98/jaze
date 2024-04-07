import { useState } from "react";
import { fetchAndProcessData } from "../apis/lastFM_API";
import { useLocalStorage } from "../utils/useLocalStorage";

export const fetchUserData = async (username: string) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { getItem, setItem } = useLocalStorage();

      setLoading(true);
      try {
        const userData = JSON.parse(getItem("lastFMUserData"));
          if (userData?.user?.name != null) {
              getItem("lastFMUserData");
              getItem("lastFMAlbumData");
              getItem("lastFMArtistData");
              getItem("lastFMTrackData");
              setLoading(false);
              return;
          }
          else {
              setItem("lastFMUserData", JSON.stringify(await Promise.resolve(fetchAndProcessData("user.getinfo", { user: username }))));
              setItem("lastFMAlbumData", JSON.stringify(await Promise.resolve(fetchAndProcessData("user.getTopAlbums", { user: username, limit: 10 }))));
              setItem("lastFMArtistData", JSON.stringify(await Promise.resolve(fetchAndProcessData("user.getTopArtists", { user: username, limit: 10 }))));
              setItem("lastFMTrackData", JSON.stringify(await Promise.resolve(fetchAndProcessData("user.getTopTracks", { user: username, limit: 10 }))));
          }

      } catch (error) {
        console.error("Failed to fetch user data", error);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }

  return {
    error,
    loading,
  };
};
