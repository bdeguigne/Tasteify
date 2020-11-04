import uiReducer from "./ui";
import userReducer from "./user";
import spotifyDataReducer from "./spotifyData";
import {combineReducers} from "redux";

const reducers = combineReducers({
    ui: uiReducer,
    user: userReducer,
    spotifyData: spotifyDataReducer
})

export default reducers