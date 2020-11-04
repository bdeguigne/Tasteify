import axios from "axios";

export const spotifyDataServices = {
    getTopTracksLastMonth,
    getTopGenresLastMonth,
    getTopTracksLast6Month,
    getTopGenresLast6Month,
    getTopTracksAllTime,
    getTopGenresAllTime
}

function getTopTracksLastMonth(accessToken) {

    const headers = {
        "Authorization": "Bearer " + accessToken
    }

    return axios.get("https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term", {
        headers
    })
}

function getTopGenresLastMonth(accessToken) {
    const headers = {
        "Authorization": "Bearer " + accessToken
    }

    return axios.get("https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term", {
        headers
    })
}

function getTopTracksLast6Month(accessToken) {

    const headers = {
        "Authorization": "Bearer " + accessToken
    }

    return axios.get("https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=medium_term", {
        headers
    })
}

function getTopGenresLast6Month(accessToken) {
    const headers = {
        "Authorization": "Bearer " + accessToken
    }

    return axios.get("https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term", {
        headers
    })
}

function getTopTracksAllTime(accessToken) {

    const headers = {
        "Authorization": "Bearer " + accessToken
    }

    return axios.get("https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term", {
        headers
    })
}

function getTopGenresAllTime(accessToken) {
    const headers = {
        "Authorization": "Bearer " + accessToken
    }

    return axios.get("https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term", {
        headers
    })
}
