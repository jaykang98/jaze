import { useState, useEffect } from "react";
import { fetchAndProcessData } from "./utils/dataHandler";
import { UserData, AlbumData, ArtistData, TrackData } from "types/dataTypes";

export const useUserData = (username: string) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [trackData, setTrackData] = useState<TrackData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);

      try {
        const userInfoPromise = fetchAndProcessData("user.getinfo", {
          user: username,
        });
        const userTopAlbumsPromise = fetchAndProcessData("user.getTopAlbums", {
          user: username,
          limit: 5,
          period: "12month",
        });
        const userTopArtistsPromise = fetchAndProcessData(
          "user.getTopArtists",
          { user: username, limit: 5 },
        );
        const userTopTracksPromise = fetchAndProcessData("user.getTopTracks", {
          user: username,
          limit: 5,
        });

        const [userInfo, userTopAlbums, userTopArtists, userTopTracks] =
          await Promise.all([
            userInfoPromise,
            userTopAlbumsPromise,
            userTopArtistsPromise,
            userTopTracksPromise,
          ]);

        setUserData(userInfo as UserData);
        setAlbumData(userTopAlbums as AlbumData);
        setArtistData(userTopArtists as ArtistData);
        setTrackData(userTopTracks as TrackData);
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
