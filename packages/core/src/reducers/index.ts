import { combineReducers } from "redux";
import { bookmarksTreeStateReducer } from "./BookmarksTreeStateReducer";

const reducers = combineReducers({
    bookmarksTreeState: bookmarksTreeStateReducer
});

export default reducers;