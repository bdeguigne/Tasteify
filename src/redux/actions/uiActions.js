const { uiConstants } = require("../constants/uiConstants");

export function setPageTitle(name) {
    return dispatch => {
        dispatch({ type: uiConstants.SET_PAGE_TITLE, name })
    };
}

export function logUser() {
    return dispatch => {
        dispatch({ type: uiConstants.LOG_USER })
    };
}