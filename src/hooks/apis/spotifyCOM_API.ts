import { useLocalStorage } from "../utils/useLocalStorage";

export const useSpotifyClient = () => {
  const { getItem, setItem } = useLocalStorage();
  const accessToken = getItem("SpotifyAccessToken");
  const spotifyApiRequest = async <T = any>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> => {
    if (!accessToken) {
      throw new Error("Access token is not available");
    }

    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
          Authorization: `Authorization: Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from Spotify Web API");
    }

    return response.json();
  };

  const fetchCurrentUserProfile = async () => {
    setItem("spotifyProfile", JSON.parse(await spotifyApiRequest("/me")));
    };
    const fetchSpotifyData = async (inputType: string, queryString: string) => {
        const q = encodeURIComponent(queryString);
        const type = encodeURIComponent(inputType);
        const response = await spotifyApiRequest(`/search?q=${q}&type=${type}`);
        return response[inputType + 's']?.items[0]?.external_urls.spotify;    };



    return { spotifyApiRequest, fetchCurrentUserProfile, fetchSpotifyData };
};
