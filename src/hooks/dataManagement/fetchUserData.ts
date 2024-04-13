import { fetchAndProcessData } from "../apis/lastFM_API";
import { useSpotifyClient } from "../apis/spotifyCOM_API";
import { useLocalStorage } from "../utils/useLocalStorage";

export const fetchUserData = async (type: string, username: string) => {
  const { setItem } = useLocalStorage();
  const { fetchCurrentUserProfile } = useSpotifyClient();
  try {
    switch (type) {
      case "Last.FM":
        const userData = await fetchAndProcessData("user.getinfo", {
          user: username,
        });
        const albumData = await fetchAndProcessData("user.getTopAlbums", {
          user: username,
          limit: 10,
        });
        const artistData = await fetchAndProcessData("user.getTopArtists", {
          user: username,
          limit: 10,
        });
        const trackData = await fetchAndProcessData("user.getTopTracks", {
          user: username,
          limit: 10,
        });
        setItem("lastFMUserData", JSON.stringify(userData));
        setItem("lastFMAlbumData", JSON.stringify(albumData));
        setItem("lastFMArtistData", JSON.stringify(artistData));
        setItem("lastFMTrackData", JSON.stringify(trackData));
        break;
      case "Spotify":
        const spotifyUserData = await fetchCurrentUserProfile();
        setItem("spotifyUserData", JSON.stringify(spotifyUserData));
        break;
      default:
        throw new Error("Invalid type");
    }
  } catch (error) {
    console.error("Failed to fetch user data", error);
    return { error: "Failed to fetch user data" };
  }
};
