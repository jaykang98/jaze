// src/hooks/getUserData.ts
import { useState, useEffect } from "react";
import { fetchData } from "../utils/askFM";

const getUserData = (username: string) => {
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const [userTopAlbums, setUserTopAlbums] = useState<any | null>(null);
  const [userTopArtists, setUserTopArtists] = useState<any | null>(null);
  const [userTopTracks, setUserTopTracks] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      fetchData("user.getinfo", { user: username })
        .then(setUserInfo)
        .catch(setError);

      fetchData("user.getTopAlbums", {
        user: username,
        limit: 5,
        period: "12month",
      })
        .then(setUserTopAlbums)
        .catch(setError);

      fetchData("user.getTopArtists", { user: username, limit: 5 })
        .then(setUserTopArtists)
        .catch(setError);

      fetchData("user.getTopTracks", { user: username, limit: 5 })
        .then(setUserTopTracks)
        .catch(setError);
    }
  }, [username]);

  return {
    userInfo,
    userTopAlbums,
    userTopArtists,
    userTopTracks,
    error,
  };
};

export default getUserData;
