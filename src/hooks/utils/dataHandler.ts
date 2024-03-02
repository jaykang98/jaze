// src/utils/DataHandler.tsx
import { fetchData } from "../api/API";

export const fetchAndProcessData = async (
    method: string,
    params: Record<string, string | number | boolean>,
) => {
  try {
    const response = await fetchData(method, params);
    return response;
  } catch (error) {
    console.error("Error fetching and processing data:", error);
    throw error;
  }
};
