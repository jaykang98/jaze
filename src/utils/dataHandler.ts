import { useState, useEffect } from "react";
import { FetchDataParams } from "./FetchDataParams";

const useDataHandler = (initialData: any) => {
  const [data, setData] = useState(initialData);
  const apiToken = "053905e1fc8b0de378dc341a24ec68c7";
  const baseUrl = "http://ws.audioscrobbler.com/2.0/";

  const generateURL = (method: string, params: FetchDataParams) => {
    const filteredParams: Record<string, string> = Object.entries(
      params,
    ).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});

    filteredParams.api_key = apiToken;
    filteredParams.format = "json";

    const queryParams = new URLSearchParams(filteredParams).toString();
    return `${baseUrl}?method=${method}&${queryParams}`;
  };

  const fetchData = async (method: string, params: FetchDataParams) => {
    try {
      const url = generateURL(method, params);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const getUserInfo = (username: string) =>
    fetchData("user.getinfo", { user: username });

  const getAlbumInfo = (artist: string, album: string, username: string) => {
    fetchData("album.getInfo", {
      artist: encodeURIComponent(artist),
      album: encodeURIComponent(album),
      user: encodeURIComponent(username),
    });
  };

  const getAlbumTopTags = (artist: string, album: string, username: string) => {
    fetchData("album.getTopTags", {
      artist: encodeURIComponent(artist),
      album: encodeURIComponent(album),
      user: encodeURIComponent(username),
    });
  };

  const getArtistInfo = (artist: string, username: string) => {
    fetchData("artist.getInfo", {
      artist: encodeURIComponent(artist),
      user: encodeURIComponent(username),
    });
  };

  const getArtistTopTags = (artist: string, username: string) => {
    fetchData("artist.getTopTags", {
      artist: encodeURIComponent(artist),
      user: encodeURIComponent(username),
    });
  };

  const getTrackInfo = (
    artist: string,
    track: string,
    username: string,
    autocorrect = 1,
  ) => {
    fetchData("track.getInfo", {
      artist: encodeURIComponent(artist),
      track: encodeURIComponent(track),
      user: encodeURIComponent(username),
      autocorrect,
    });
  };

  const getTrackTopTags = (artist: string, track: string, autocorrect = 1) => {
    fetchData("track.getTopTags", {
      artist: encodeURIComponent(artist),
      track: encodeURIComponent(track),
      autocorrect,
    });
  };

  const getTopArtists = (page = 1, limit: number) => {
    fetchData("chart.getTopArtists", { page, limit });
  };

  const getUserRecentTracks = (
    username: string,
    limit: number,
    page = 1,
    extended = 1,
  ) => {
    fetchData("user.getRecentTracks", {
      user: encodeURIComponent(username),
      limit,
      page,
      extended,
    });
  };

  const getUserTopAlbums = (
    username: string,
    limit: number,
    period = "12month",
  ) => {
    fetchData("user.getTopAlbums", {
      user: encodeURIComponent(username),
      limit,
      period,
    });
  };

  const getUserTopArtists = (username: string, limit: number) => {
    fetchData("user.getTopArtists", {
      user: encodeURIComponent(username),
      limit,
    });
  };

  const getUserTopTracks = (username: string, limit: number) => {
    fetchData("user.getTopTracks", {
      user: encodeURIComponent(username),
      limit,
    });
  };

  useEffect(() => {
    // Initialize data or perform side effects here
  }, []);

  return {
    data,
    getUserInfo,
    getAlbumInfo,
    getAlbumTopTags,
    getArtistInfo,
    getArtistTopTags,
    getTrackInfo,
    getTrackTopTags,
    getTopArtists,
    getUserRecentTracks,
    getUserTopAlbums,
    getUserTopArtists,
    getUserTopTracks,
  };
};

export default useDataHandler;
