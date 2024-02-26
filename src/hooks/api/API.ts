// src/api/API.ts

/**
 * Generic function to fetch data from an API.
 * @param method The API method to call.
 * @param params The query parameters for the API request.
 * @returns A promise resolving with the response data.
 */
export async function fetchData(
  method: string,
  params: Record<string, any>,
): Promise<any> {
  const apiToken = "053905e1fc8b0de378dc341a24ec68c7";
  const baseUrl = "http://ws.audioscrobbler.com/2.0/";

  params.api_key = apiToken;
  params.format = "json";

  const query = new URLSearchParams(params).toString();
  const url = `${baseUrl}?method=${method}&${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}
