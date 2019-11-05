import { BookmarksTree } from "../model/BookmarksTree";
import { PathPlaceholder } from "../placeholders/PathPlaceholder";
import { Map } from 'immutable';

export type BookmarksTreeState = {
    bookmarksTree : BookmarksTree,
    filePath : string,
    loadError : Error
}

export type PathPlaceholdersState = {
    pathPlaceholders : Map<string, PathPlaceholder>;
}

export type State = {
    bookmarksTreeState : BookmarksTreeState
    pathPlaceholdersState : PathPlaceholdersState;
}