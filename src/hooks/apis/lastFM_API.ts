export const fetchAndProcessData = async <T>(
  method: string,
  params: Record<string, string | number | boolean>,
): Promise<T> => {
  if (
    !process.env.REACT_APP_LASTFM_APIKEY ||
    !process.env.REACT_APP_LASTFM_BASEURL
  ) {
    throw new Error(
      "API key or base URL is not defined in environment variables.",
    );
  }

  const queryParams = new URLSearchParams({
    ...params,
    api_key: process.env.REACT_APP_LASTFM_APIKEY,
    format: "json",
  }).toString();

  const url = `${process.env.REACT_APP_LASTFM_BASEURL}?method=${method}&${queryParams}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Failed to fetch and process data:", error);
    throw error;
  }
};
