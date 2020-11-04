import axios from "axios";
require('dotenv').config()
const querystring = require("querystring");

export const userServices = {
    getUserInfo,
    authorizeUser,
    getAccessToken
};

function authorizeUser() {
    const clientID = "aef81b01d4254ec195e10e20a46aa47e";
    const scopes = "user-read-email user-top-read";
    const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

    window.open("https://accounts.spotify.com/authorize" +
        "?client_id=" + clientID +
        "&response_type=code" +
        "&redirect_uri=" + encodeURIComponent(redirect_uri) +
        "&scope=" + encodeURIComponent(scopes),
        "_self"
    );
}

function getAccessToken(code) {
    const data = querystring.stringify({
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        client_secret: process.env.REACT_APP_SPOTIFY_SECRET,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        "grant_type": "authorization_code",
        code: code,
    })

    const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    return (axios.post("https://accounts.spotify.com/api/token", data, {
        headers
    })).then()
}


function getUserInfo(accessToken) {
    const headers = {
        "Authorization": "Bearer " + accessToken
    }

    return axios.get("https://api.spotify.com/v1/me", {
        headers
    })
}