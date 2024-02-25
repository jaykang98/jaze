// src/utils/askFM.ts
export interface askFMParams {
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

const apiToken = "053905e1fc8b0de378dc341a24ec68c7";
const baseUrl = "http://ws.audioscrobbler.com/2.0/";

const generateURL = (method: string, params: askFMParams): string => {
    const filteredParams: Record<string, string> = Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined) {
            acc[key] = String(value);
        }
        return acc;
    }, {});

    filteredParams.api_key = apiToken;
    filteredParams.format = "json";

    const queryParams = new URLSearchParams(filteredParams).toString();
    return `${baseUrl}?method=${method}&${queryParams}`;
};

export const fetchData = async (method: string, params: askFMParams): Promise<any> => {
    try {
        const url = generateURL(method, params);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch data:", error);
        throw error; 
    }
};
