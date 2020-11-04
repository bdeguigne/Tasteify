import { spotifyDataConstants } from "../constants/spotifyDataConstants";
import { spotifyDataServices } from "../services/spotifyDataServices";

export function getTopLastMonth() {
    return dispatch => {
        dispatch(getTopTracksLastMonth())
        dispatch(getTopGenresLastMonth())
    }
}

export function getTopLast6Month() {
    return dispatch => {
        dispatch(getTopTracksLast6Month())
        dispatch(getTopGenresLast6Month())
    }
}

export function getTopAllTime() {
    return dispatch => {
        dispatch(getTopTracksAllTime())
        dispatch(getTopGenresAllTime())
    }
}

function getTopTracksLastMonth() {
    return (dispatch, getState) => {
        var accessToken = getState().user.tokens.accessToken;

        dispatch(topTrackRequest());
        spotifyDataServices.getTopTracksLastMonth(accessToken)
            .then(
                data => {
                    var topTracks = extractFavoriteTracks(data.data.items);
                    dispatch(storeTopTracksLastMonth(topTracks))
                }
            )
            .catch(function (error) {
                if (error.response) {
                    dispatch(failure(error.response))
                } else {
                    dispatch(failure(error))
                }
            })
    }
}

function getTopGenresLastMonth() {
    return (dispatch, getState) => {
        var accessToken = getState().user.tokens.accessToken;

        dispatch(topGenreRequest());
        spotifyDataServices.getTopGenresLastMonth(accessToken)
            .then(
                data => {
                    var topGenres = extractFavoriteGenres(data.data.items);
                    dispatch(storeTopGenresLastMonth(topGenres))
                }
            )
            .catch(function (error) {
                if (error.response) {
                    dispatch(failure(error.response))
                } else {
                    dispatch(failure(error))
                }
            })
    }
}

function getTopTracksLast6Month() {
    return (dispatch, getState) => {
        var accessToken = getState().user.tokens.accessToken;

        dispatch(topTrackRequest());
        spotifyDataServices.getTopTracksLast6Month(accessToken)
            .then(
                data => {
                    var topTracks = extractFavoriteTracks(data.data.items);
                    dispatch(storeTopTracksLast6Month(topTracks))
                }
            )
            .catch(function (error) {
                if (error.response) {
                    dispatch(failure(error.response))
                } else {
                    dispatch(failure(error))
                }
            })
    }
}

function getTopGenresLast6Month() {
    return (dispatch, getState) => {
        var accessToken = getState().user.tokens.accessToken;

        dispatch(topGenreRequest());
        spotifyDataServices.getTopGenresLast6Month(accessToken)
            .then(
                data => {
                    var topGenres = extractFavoriteGenres(data.data.items);
                    dispatch(storeTopGenresLast6Month(topGenres))
                }
            )
            .catch(function (error) {
                if (error.response) {
                    dispatch(failure(error.response))
                } else {
                    dispatch(failure(error))
                }
            })
    }
}

function getTopTracksAllTime() {
    return (dispatch, getState) => {
        var accessToken = getState().user.tokens.accessToken;

        dispatch(topTrackRequest());
        spotifyDataServices.getTopTracksAllTime(accessToken)
            .then(
                data => {
                    var topTracks = extractFavoriteTracks(data.data.items);
                    dispatch(storeTopTracksAllTime(topTracks))
                }
            )
            .catch(function (error) {
                if (error.response) {
                    dispatch(failure(error.response))
                } else {
                    dispatch(failure(error))
                }
            })
    }
}

function getTopGenresAllTime() {
    return (dispatch, getState) => {
        var accessToken = getState().user.tokens.accessToken;

        dispatch(topGenreRequest());
        spotifyDataServices.getTopGenresAllTime(accessToken)
            .then(
                data => {
                    var topGenres = extractFavoriteGenres(data.data.items);
                    dispatch(storeTopGenresAllTime(topGenres))
                }
            )
            .catch(function (error) {
                if (error.response) {
                    dispatch(failure(error.response))
                } else {
                    dispatch(failure(error))
                }
            })
    }
}

function extractFavoriteTracks(tracks) {
    var topTracks = [];
    // console.log("TRACKS", tracks);
    tracks.forEach((track, i) => {
        var artists = [];
        track.artists.forEach(artist => {
            artists.push(artist.name)
        })

        var trackInfo = {
            albumCoverURL: track.album.images[2].url,
            position: i + 1,
            trackName: track.name,
            artistName: artists.join(", ")
        }
        topTracks.push(trackInfo);
    });
    return topTracks;
}

function extractFavoriteGenres(artists) {
    var genres = [];

    //Extract all genres
    artists.forEach(artist => {
        artist.genres.forEach(genre => {
            genres.push(genre);
        })
    })

    var countedGenres = []
    //Loop though each genres
    genres.forEach(genre => {
        //Get the number of occurences of this genre
        var count = genres.reduce(function(n, val) {
            return n + (val === genre)
        }, 0)

        var countedGenre = {
            genre,
            count
        }
        
        countedGenres.push(countedGenre);
    })

    // Remove all duplicates (archi dégueu :p)
    var filteredCountedGenres = countedGenres.filter((v,i,a)=>a.findIndex(t=>(t.genre === v.genre && t.count===v.count))===i)
    
    genres = getPercentageOfGenres(filteredCountedGenres);

    return genres;
}

function compare( a, b ) {
    if ( parseInt(a.percent) > parseInt(b.percent) ){
      return -1;
    }
    if (parseInt(a.percent) <parseInt(b.percent)){
      return 1;
    }
    return 0;
  }

function getPercentageOfGenres(countedGenres) {
    console.log("COUNTED GENRES", countedGenres);

    var totalGenres = 0;
    // Get total number of genres
    countedGenres.forEach(countedGenre => {
        totalGenres += countedGenre.count;
    })

    console.log("TOTAL", totalGenres);

    var percentGenres = [];
    // make a % of genres
    countedGenres.forEach(countedGenre => {
        var count = countedGenre.count;
        var percent = 100 * (count / totalGenres);

        var percentGenre = {
            genre: countedGenre.genre,
            percent : percent.toFixed(0),
            count:count
        }
        percentGenres.push(percentGenre);
    })

    percentGenres.sort(compare);

    return percentGenres;
}

export function topTrackRequest() {
    return {
        type: spotifyDataConstants.SPOTIFY_DATA_TRACK_REQUEST
    }
}

export function topGenreRequest() {
    return {
        type: spotifyDataConstants.SPOTIFY_DATA_GENRE_REQUEST
    }
}

export function storeTopTracksLastMonth(topTracks) {
    return {
        type: spotifyDataConstants.SPOTIFY_DATA_STORE_TOP_TRACKS_LAST_MONTH,
        topTracks
    }
}

export function storeTopGenresLastMonth(topGenres) {
    return {
        type: spotifyDataConstants.SPOTIFY_DATA_STORE_TOP_GENRES_LAST_MONTH,
        topGenres
    }
}

export function storeTopTracksLast6Month(topTracks) {
    return {
        type: spotifyDataConstants.SPOTIFY_DATA_STORE_TOP_TRACKS_LAST_6_MONTH,
        topTracks
    }
}

export function storeTopGenresLast6Month(topGenres) {
    return {
        type: spotifyDataConstants.SPOTIFY_DATA_STORE_TOP_GENRES_LAST_6_MONTH,
        topGenres
    }
}

export function storeTopTracksAllTime(topTracks) {
    return {
        type: spotifyDataConstants.SPOTIFY_DATA_STORE_TOP_TRACKS_ALL_TIME,
        topTracks
    }
}

export function storeTopGenresAllTime(topGenres) {
    return {
        type: spotifyDataConstants.SPOTIFY_DATA_STORE_TOP_GENRES_ALL_TIME,
        topGenres
    }
}


export function failure(error) {
    return {
        type: spotifyDataConstants.SPOTIFY_DATA_FAILURE,
        error
    }
}