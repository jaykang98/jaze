// src/hooks/api/API.ts
export async function fetchData(
  method: string,
  params: Record<string, any>,
): Promise<any> {
  params.api_key = process.env.REACT_APP_APIKEY;
  params.format = "json";

  const query = new URLSearchParams(params).toString();
  const url = `${process.env.REACT_APP_BASEURL}?method=${method}&${query}`;

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
