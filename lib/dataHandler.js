// ./lib/datahandler.js
const axios = require('axios');

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
String apiToken {
return "053905e1fc8b0de378dc341a24ec68c7";
}