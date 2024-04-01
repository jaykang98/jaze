import { useState, useEffect } from "react";
import { fetchAndProcessData } from "./fetchAndProcessData";
import { UserData, AlbumData, ArtistData, TrackData } from "types/dataTypes";
import { decryptData, encryptData } from "../security/utils";
import { useLocalStorage } from "../../hooks/utils/useLocalStorage";

const settings = {
  isDecryptMode: false,
};

export const getIsDecryptMode = () => settings.isDecryptMode;
export const setIsDecryptMode = (mode: boolean) => {
  settings.isDecryptMode = mode;
};

export const fetchUserData = (username: string) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [trackData, setTrackData] = useState<TrackData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [spotifyAccessToken, setSpotifyAccessToken] = useState<string | null>(
    null,
  );
  const localStorageKey = `lastFMData_${username}`;

  useEffect(() => {
    const fetchSpotifyAccessToken = async () => {
    };

    const fetchSpotifyData = async () => {
      if (!spotifyAccessToken) return;
    };

      const localStorageKey = `lastFMData_${username}`;
    const fetchData = async () => {
      setLoading(true);
      try {
        const storedDataStr = localStorage.getItem(localStorageKey);
        let storedData = {};

        if (storedDataStr) {
          const processedDataStr = settings.isDecryptMode
            ? decryptData(storedDataStr)
            : storedDataStr;
          storedData = JSON.parse(processedDataStr);
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

        setUserData(userData as UserData);
        setAlbumData(userAlbums as AlbumData);
        setArtistData(userArtists as ArtistData);
        setTrackData(userTracks as TrackData);

        const dataToStore = JSON.stringify({
          userData: userData,
          albumData: userAlbums,
          artistData: userArtists,
          trackData: userTracks,
        });

        localStorage.setItem(
          localStorageKey,
          settings.isDecryptMode ? encryptData(dataToStore) : dataToStore,
        );
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    const initSpotifyAuthFlow = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) {
        await fetchSpotifyAccessToken();
        await fetchSpotifyData();
      }
    };

    fetchData();
    initSpotifyAuthFlow();
  }, [username]);

  return { userData, albumData, artistData, trackData, error, loading };
};
