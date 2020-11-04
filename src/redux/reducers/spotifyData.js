import { spotifyDataConstants } from "../constants/spotifyDataConstants"

let defaultState = {
    topTracksRequesting: true,
    topGenresRequesting: true
};

const spotifyDataReducer = (state = defaultState, action) => {
    switch (action.type) {
        case spotifyDataConstants.SPOTIFY_DATA_TRACK_REQUEST:
            return {
                ...state,
                topTracksRequesting: true
            }
        case spotifyDataConstants.SPOTIFY_DATA_GENRE_REQUEST:
            return {
                ...state,
                topGenresRequesting: true
            }
        case spotifyDataConstants.SPOTIFY_DATA_FAILURE:
            return {
                error: action.error
            }
        case spotifyDataConstants.SPOTIFY_DATA_STORE_TOP_TRACKS_LAST_MONTH:
            return {
                ...state,
                topTracksRequesting: false,
                topTracks: action.topTracks
            }
        case spotifyDataConstants.SPOTIFY_DATA_STORE_TOP_GENRES_LAST_MONTH:
            return {
                ...state,
                topGenresRequesting: false,
                topGenres: action.topGenres
            }
        case spotifyDataConstants.SPOTIFY_DATA_STORE_TOP_TRACKS_LAST_6_MONTH:
            return {
                ...state,
                topTracksRequesting: false,
                topTracks: action.topTracks
            }
        case spotifyDataConstants.SPOTIFY_DATA_STORE_TOP_GENRES_LAST_6_MONTH:
            return {
                ...state,
                topGenresRequesting: false,
                topGenres: action.topGenres
            }
        case spotifyDataConstants.SPOTIFY_DATA_STORE_TOP_TRACKS_ALL_TIME:
            return {
                ...state,
                topTracksRequesting: false,
                topTracks: action.topTracks
            }
        case spotifyDataConstants.SPOTIFY_DATA_STORE_TOP_GENRES_ALL_TIME:
            return {
                ...state,
                topGenresRequesting: false,
                topGenres: action.topGenres
            }
        default:
            return state
    }
}

export default spotifyDataReducer;