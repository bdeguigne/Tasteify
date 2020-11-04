import { userServices } from "../services/userServices";
import { logUser } from "../actions/uiActions";

const { userConstants } = require("../constants/userConstants");

export function authorizeUser() {
    return dispatch => {
        dispatch(request());
        userServices.authorizeUser();
    }
}

export function getAccessToken(code) {
    return dispatch => {
        dispatch(request());
        userServices.getAccessToken(code)
            .then(
                tokens => {
                    var accessToken = tokens.data.access_token;
                    var refreshToken = tokens.data.refresh_token;

                    localStorage.setItem('access_token', accessToken);
                    localStorage.setItem('refresh_token', refreshToken);
                    dispatch(authenticateUser(accessToken, refreshToken));
                },
            )
            .catch(function (error) {
                if (error.response) {
                    dispatch(failure(error.response))
                } else {
                    dispatch(failure(error))
                }
            });
    }
}

export function authenticateUser(accessToken, refreshToken) {
    return (dispatch) => {
        const tokens = {
            accessToken,
            refreshToken
        }
        dispatch(getUserInfo(accessToken));
        dispatch(storeTokens(tokens));
    }
}

export function getUserInfo(accessToken) {
    return dispatch => {
        userServices.getUserInfo(accessToken)
            .then(
                user => {
                    dispatch(storeUser(user.data))
                    dispatch(logUser());
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
}

export function request() {
    return {
        type: userConstants.LOG_USER_REQUEST
    }
}

export function storeTokens(tokens) {
    return {
        type: userConstants.LOG_USER_STORE_TOKENS,
        tokens
    }
}

export function storeUser(user) {
    return {
        type: userConstants.LOG_USER_STORE_USER,
        user
    }
}

export function failure(error) {
    return {
        type: userConstants.LOG_USER_FAILURE,
        error
    }
}

export function disconnectUser() {
    localStorage.setItem('access_token', "");
    localStorage.setItem('refresh_token', "");
    return {
        type: userConstants.LOG_USER_DISCONNECT
    }
}