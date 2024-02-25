// FileName: useDataHandler.tsx (Assuming this is part of your React application's utility functions)
import { FetchDataParams } from "types"
import { useState } from "react";
export const apiToken = "053905e1fc8b0de378dc341a24ec68c7";
export const baseUrl = "http://ws.audioscrobbler.com/2.0/";



const generateURL = (method: string, params: FetchDataParams): string => {
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

export const fetchData = async (method: string, params: FetchDataParams) => {
    try {
        const url = generateURL(method, { ...params, api_key: apiToken });
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return null;
    }
};

const useDataHandler = (initialData: any) => {
    const [data, setData] = useState(initialData);

    const fetchAndSetData = async (method: string, params: FetchDataParams) => {
        const jsonData = await fetchData(method, params);
        if (jsonData) setData(jsonData);
        return jsonData;
    };

    // Merged functionalities from both versions
    const getUserInfo = async (username: string) => {
        return await fetchAndSetData("user.getinfo", { user: username });
    };

    const getTrackInfo = async (artist: string, track: string, username: string, autocorrect = 1) => {
        return await fetchData("track.getInfo", {
            artist: encodeURIComponent(artist),
            track: encodeURIComponent(track),
            user: encodeURIComponent(username),
            autocorrect,
        });
    };

    const getUserTopAlbums = async (username: string, period = 'overall', limit = 50, page = 1) => {
        const params: FetchDataParams = {
            user: username,
            period,
            limit,
            page
        };
        return await fetchData('user.getTopAlbums', params);
    };


    return {
        data,
        getUserInfo,
        getTrackInfo,
        getUserTopAlbums,
    };
};

export default useDataHandler;
