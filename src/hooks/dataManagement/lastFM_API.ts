export async function fetchData<T>(
  method: string,
  params: Record<string, string | number | boolean>,
): Promise<T> {
  const apiKey = process.env.REACT_APP_LASTFM_APIKEY;
  const baseUrl = process.env.REACT_APP_LASTFM_BASEURL;

  if (!apiKey || !baseUrl) {
    throw new Error(
      "API key or base URL is not defined in environment variables.",
    );
  }

  const queryParams = new URLSearchParams({
    ...params,
    api_key: apiKey,
    format: "json",
  }).toString();

  const url = `${baseUrl}?method=${method}&${queryParams}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}
export interface FetchDataParams {
  [key: string]: string | number | boolean;
  user?: string;
  artist?: string;
  album?: string;
  track?: string;
  autocorrect?: number;
  page?: number;
  limit?: number;
  period?: string;
  extended?: number;
}
