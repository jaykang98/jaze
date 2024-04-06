import { useState } from "react";
import { SpotifyUserProfile } from "types/dataTypes";

interface SpotifyAccessToken {
  token: string;
  expiresIn: number;
}

export const useSpotifyClient = () => {
  const [accessToken, setAccessToken] = useState<SpotifyAccessToken | null>(
    null,
  );

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
        Authorization: `Bearer ${accessToken.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from Spotify Web API");
    }

    return response.json();
  };

  const fetchCurrentUserProfile = async (): Promise<SpotifyUserProfile> => {
    return spotifyApiRequest<SpotifyUserProfile>("/me");
  };

  return { spotifyApiRequest, fetchCurrentUserProfile };
};
