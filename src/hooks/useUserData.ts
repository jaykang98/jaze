// src/hooks/useUserData.ts
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

    const fetchUserInfo = async () => {
      try {
        const userInfo = await fetchAndProcessData("user.getinfo", {
          user: username,
        });
        setUserInfo(userInfo);
      } catch (error) {
        setError("Failed to fetch user info");
      }
    };

    const fetchUserTopAlbums = async () => {
      try {
        const userTopAlbums = await fetchAndProcessData("user.getTopAlbums", {
          user: username,
          limit: 5,
          period: "12month",
        });
        setUserTopAlbums(userTopAlbums);
      } catch (error) {
        setError("Failed to fetch top albums");
      }
    };

    const fetchUserTopArtists = async () => {
      try {
        const userTopArtists = await fetchAndProcessData("user.getTopArtists", {
          user: username,
          limit: 5,
        });
        setUserTopArtists(userTopArtists);
      } catch (error) {
        setError("Failed to fetch top artists");
      }
    };

    const fetchUserTopTracks = async () => {
      try {
        const userTopTracks = await fetchAndProcessData("user.getTopTracks", {
          user: username,
          limit: 5,
        });
        setUserTopTracks(userTopTracks);
      } catch (error) {
        setError("Failed to fetch top tracks");
      }
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
