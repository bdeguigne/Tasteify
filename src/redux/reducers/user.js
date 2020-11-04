import { userConstants } from "../constants/userConstants";

let defaultState = {
};

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case userConstants.LOG_USER_REQUEST:
            return {
                requesting: true
            };
        case userConstants.LOG_USER_STORE_TOKENS:
            return {
                tokens: action.tokens
            };
        case userConstants.LOG_USER_STORE_USER:
            return {
                ...state,
                user: action.user
            };
        case userConstants.LOG_USER_FAILURE:
            return {
                error: action.error
            };
        case userConstants.LOG_USER_DISCONNECT:
            return defaultState
        default:
            return state;
    }
}

export default userReducer;