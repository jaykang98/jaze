const axios = require('axios');

function parseParams(params) {
    let parsedParams = {};
    params.forEach(param => {
        if (param.length === 2) {
            parsedParams[param[0]] = param[1];
        }
    });
    return parsedParams;
}

function generateURL(method, parameters) {
    const baseUrl = 'http://ws.audioscrobbler.com/2.0/';
    const apiKey = 'YOUR_API_KEY';
    let queryParams = new URLSearchParams({
        method: method,
        api_key: apiKey,
        format: 'json'
    });

    Object.keys(parameters).forEach(key => {
        queryParams.append(key, parameters[key]);
    });

    return `${baseUrl}?${queryParams.toString()}`;
}

async function fetchData(method, params) {
    if (!params) return;

    try {
        const url = generateURL(method, params);
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for ${method}:`, error);
        return null;
    }
}

async function getUserInfo(username) {
    return await fetchData('user.getinfo', { user: encodeURIComponent(username) });
}

async function getAlbumInfo(artist, album, username) {
    return await fetchData('album.getInfo', { artist: encodeURIComponent(artist), album: encodeURIComponent(album), username: encodeURIComponent(username) });
}

async function getAlbumTopTags(artist, album, username) {
    return await fetchData('album.getTopTags', { artist: encodeURIComponent(artist), album: encodeURIComponent(album), username: encodeURIComponent(username) });
}

async function getArtistInfo(artist, username) {
    return await fetchData('artist.getInfo', { artist: encodeURIComponent(artist), username: encodeURIComponent(username) });
}

async function getArtistTopTags(artist, username) {
    return await fetchData('artist.getTopTags', { artist: encodeURIComponent(artist), username: encodeURIComponent(username) });
}

async function getTrackInfo(artist, track, username, autocorrect = 1) {
    return await fetchData('track.getInfo', { artist: encodeURIComponent(artist), track: encodeURIComponent(track), username: encodeURIComponent(username), autocorrect });
}

async function getTrackTopTags(artist, track, autocorrect = 1) {
    return await fetchData('track.gettoptags', { artist: encodeURIComponent(artist), track: encodeURIComponent(track), autocorrect });
}

async function getTopArtists(page = 1, limit) {
    return await fetchData('chart.getTopArtists', { page, limit });
}

async function getUserRecentTracks(username, limit, page = 1, extended = 1) {
    return await fetchData('user.getRecentTracks', { user: encodeURIComponent(username), limit, page, extended });
}

async function getUserTopAlbums(username, limit, period = '12month') {
    return await fetchData('user.getTopAlbums', { user: encodeURIComponent(username), limit, period });
}

async function getUserTopArtists(username, limit) {
    return await fetchData('user.getTopArtists', { user: encodeURIComponent(username), limit });
}

async function getUserTopTracks(username, limit) {
    return await fetchData('user.getTopTracks', { user: encodeURIComponent(username), limit });
}

module.exports = {
    parseParams,
    generateURL,
    fetchData,
    getUserInfo,
    getAlbumInfo,
    getAlbumTopTags,
    getArtistInfo,
    getArtistTopTags,
    getTrackInfo,
    getTrackTopTags,
    getTopArtists,
    getUserRecentTracks,
    getUserTopAlbums,
    getUserTopArtists,
    getUserTopTracks
};
