import { useState } from "react";
export const apiToken = "053905e1fc8b0de378dc341a24ec68c7";
export const baseUrl = "http://ws.audioscrobbler.com/2.0/";

interface FetchDataParams {
    user?: string;
    artist?: string;
    album?: string;
    track?: string;
    autocorrect?: number;
    page?: number;
    limit?: number;
    period?: string;
    extended?: number;
    api_key?: string;
}

const generateURL = (method: string, params: FetchDataParams): string => {
    const filteredParams: Record<string, string> = Object.entries(params).reduce((acc, [key, value]) => {
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

export const fetchData = async (method: string, params: FetchDataParams) => {
    try {
        const url = generateURL(method, { ...params, api_key: apiToken }); 
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return null;
    }
};

const useDataHandler = (initialData: any) => {
    const [data, setData] = useState(initialData);

    const fetchAndSetData = async (method: string, params: FetchDataParams) => {
        const jsonData = await fetchData(method, params);
        if (jsonData) setData(jsonData);
        return jsonData;
    };

    const getUserTopAlbums = async (username: string, period:'overall', limit:50, page:1) => {
        const params: FetchDataParams = {
            user: username,
            api_key: apiToken, 
            format: 'json',
            method: 'user.gettopalbums',
            period,
            limit,
            page
        };
        return await fetchData('user.getTopAlbums', params);
    };

    const getUserInfo = async (username: string) => {
        return await fetchAndSetData("user.getinfo", { user: username });
    };

<<<<<<< Updated upstream
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

  const getTrackTopTags = (
    artist: string,
    track: string,
    autocorrect = 1,
  ) => {
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
=======
    return {
        data,
        getUserInfo,
        getUserTopAlbums,
    };
>>>>>>> Stashed changes
};

export default useDataHandler;
