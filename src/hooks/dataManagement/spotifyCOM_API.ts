import { useState, useEffect } from "react";
import { SpotifyUserProfile } from "types/dataTypes";
interface SpotifyApiConfig {
  clientId: string;
  clientSecret: string;
}

interface SpotifyAccessToken {
  token: string;
  expiresIn: number;
}

export const useSpotifyClient = (config: SpotifyApiConfig) => {
  const [accessToken, setAccessToken] = useState<SpotifyAccessToken | null>(
    null,
  );

  const fetchAccessToken = async () => {
    const authString = btoa(
        `${process.env.REACT_APP_SPOTIFY_CLIENTID}:${process.env.REACT_APP_SPOTIFY_CLIENTSECRET}`,
    );
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error("Spotify authentication failed");
    }

    const data = await response.json();
    setAccessToken({
      token: data.access_token,
      expiresIn: data.expires_in,
    });
  };

  useEffect(() => {
    fetchAccessToken();
  }, []);

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
