import { uiConstants } from "../constants/uiConstants";
import { userConstants } from "../constants/userConstants";

let defaultState = {
    pageTitle: "Tracks",
    isLogged: false
};

function UIReducer(state = defaultState, action) {
    switch (action.type) {
        case uiConstants.SET_PAGE_TITLE:
            return {
                ...state,
                pageTitle: action.name
            };
        case uiConstants.LOG_USER:
            return {
                ...state,
                isLogged: !state.isLogged
            }
            case userConstants.LOG_USER_DISCONNECT:
                return defaultState
        default:
            return state
    }
};

export default UIReducer;