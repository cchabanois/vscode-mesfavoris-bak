import { BookmarksTree } from "../model/BookmarksTree";
import { BookmarkFolder } from "../model/Bookmark";
import * as bookmarksActions from "../actions/BookmarksActions";
import { ActionType, getType } from "typesafe-actions";
import { BookmarksTreeDeserializer } from "../persistence/BookmarksTreeDeserializer";
import * as fs from 'fs';
import { BookmarksTreeState } from "../state/State";
import { combineReducers } from "redux";

export type BookmarksAction = ActionType<typeof bookmarksActions>;

const createInitialBookmarksTree = () => {
    const rootFolder = BookmarkFolder.bookmarkFolder("root", "Root");
    let bookmarksTree = BookmarksTree.bookmarksTree(rootFolder);
    const defaultFolder = BookmarkFolder.bookmarkFolder("default", "default");
    bookmarksTree = bookmarksTree.addBookmarks(rootFolder.bookmarkId, [defaultFolder]);
    return bookmarksTree;
};

const bookmarksTreeReducer = (state : BookmarksTree  = createInitialBookmarksTree(), action : BookmarksAction) : BookmarksTree => {
    switch(action.type) {
        case getType(bookmarksActions.loadBookmarks.success) :
            return action.payload.bookmarksTree;
        break;
        default:
            return state;
    }
};

const loadBookmarksErrorReducer = (state : Error|null = null, action : BookmarksAction) : Error|null => {
    switch(action.type) {
        case getType(bookmarksActions.loadBookmarks.success) :
            return null;
        break;        
        case getType(bookmarksActions.loadBookmarks.failure) :
            return action.payload;
        break;
        default:
            return state;
    };
};

const bookmarksFilePathReducer = (state : string|null = null, action : BookmarksAction) : string|null => {
    switch(action.type) {
        case getType(bookmarksActions.loadBookmarks.success) :
            return action.payload.filePath;
        break;        
        case getType(bookmarksActions.loadBookmarks.failure) :
            return null;
        break;
        default:
            return state;
    };
}

export const bookmarksTreeStateReducer = combineReducers({
    bookmarksTree : bookmarksTreeReducer,
    loadError : loadBookmarksErrorReducer,
    filePath : bookmarksFilePathReducer
});