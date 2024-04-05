import { useState, useEffect } from "react";
import { fetchAndProcessData } from "./fetchAndProcessData";
import { lastFMUser, AlbumData, ArtistData, TrackData } from "types/dataTypes";
import { decryptData, encryptData } from "../security/encryptionProtocol";

const settings = {
  get enableDecryption() {
    return localStorage.getItem("enableDecryption") === "true";
  },
  set enableDecryption(value: boolean) {
    localStorage.setItem("enableDecryption", String(value));
  },
};
export const decryptionMode = (): boolean => settings.enableDecryption;
export const setDecryptionMode = (): void => {
  settings.enableDecryption = !settings.enableDecryption;
};

export const fetchUserData = (username: string) => {
  const [userData, setUserData] = useState<lastFMUser | null>(null);
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [trackData, setTrackData] = useState<TrackData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const localStorageKey = `lastFMData`;
    const fetchData = async () => {
      setLoading(true);
      try {
        const storedDataStr = localStorage.getItem(localStorageKey);
        if (storedDataStr) {
          try {
            const processedDataStr = settings.enableDecryption
              ? decryptData(storedDataStr)
              : storedDataStr;
            const storedData = JSON.parse(processedDataStr);

            if (
              storedData &&
              storedData.userData &&
              storedData.albumData &&
              storedData.artistData &&
              storedData.trackData
            ) {
              setUserData(storedData.userData);
              setAlbumData(storedData.albumData);
              setArtistData(storedData.artistData);
              setTrackData(storedData.trackData);
              setLoading(false);
              return;
            }
          } catch (error) {
            console.error("Error parsing stored user data", error);
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

        localStorage.setItem(
          localStorageKey,
          settings.enableDecryption ? encryptData(dataToStore) : dataToStore,
        );
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return { userData, albumData, artistData, trackData, error, loading };
};
