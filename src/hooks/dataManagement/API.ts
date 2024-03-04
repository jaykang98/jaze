export async function fetchData<T>(
  method: string,
  params: Record<string, string | number | boolean>,
): Promise<T> {
  const queryParams = new URLSearchParams({
    ...params,
    api_key: process.env.REACT_APP_APIKEY!,
    format: "json",
  }).toString();

  const url = `${process.env.REACT_APP_BASEURL}?method=${method}&${queryParams}`;

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
  [key: string]: string | number;
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
  format?: string;
}
