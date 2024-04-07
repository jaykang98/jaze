import { fetchAndProcessData } from "../apis/lastFM_API";
import { useLocalStorage } from "../utils/useLocalStorage";

export const fetchUserData = async (username: string) => {
  const { setItem } = useLocalStorage();
  try {
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
  } catch (error) {
    console.error("Failed to fetch user data", error);
    return { error: "Failed to fetch user data" };
  }
};
