import { BookmarksTree } from "../model/BookmarksTree";

export type BookmarksTreeState = {
    bookmarksTree : BookmarksTree,
    filePath : string,
    loadError : Error
}

export type State = {
    bookmarksTreeState : BookmarksTreeState
    
}