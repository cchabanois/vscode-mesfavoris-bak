import { Epic } from "redux-observable";
import { BookmarksAction } from "../reducers/BookmarksTreeStateReducer";
import { State } from "../state/State";
import { loadBookmarks, addBookmarks, saveBookmarks } from "../actions/BookmarksActions";
import { isActionOf } from "typesafe-actions";
import { filter, map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import * as fs from 'fs';
import { BookmarksTreeDeserializer } from "../persistence/BookmarksTreeDeserializer";
import { from, pipe, of, Observable, interval } from "rxjs";
import { BookmarksTree } from "../model/BookmarksTree";
import { BookmarksTreeSerializer } from "../persistence/BookmarksTreeSerializer";

const readBookmarksFile = (path: string) => {
    return new Promise<BookmarksTree>((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const bookmarksTreeDeserializer = new BookmarksTreeDeserializer();
                const bookmarksTree = bookmarksTreeDeserializer.deserialize(data);
                resolve(bookmarksTree);
            }
        });
    });
};

const saveBookmarksFile = (bookmarksTree : BookmarksTree, path: string) => {
    return new Promise<void>((resolve, reject) => {
        const bookmarksTreeSerializer = new BookmarksTreeSerializer();
        const bookmarksTreeAsJson = bookmarksTreeSerializer.serialize(bookmarksTree);
        fs.writeFile(path, bookmarksTreeAsJson, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const loadBookmarksEpic: Epic<BookmarksAction, BookmarksAction, State> = (action$, state) =>
    action$.pipe(
        filter(isActionOf(loadBookmarks.request)),
        switchMap(action =>
            from(readBookmarksFile(action.payload)).pipe(
                map(bookmarksTree => loadBookmarks.success( { bookmarksTree, filePath : action.payload })),
                catchError(err => of(loadBookmarks.failure(err)))
            )
        )
    );

const saveBookmarksEpic: Epic<BookmarksAction, BookmarksAction, State> = (action$, state) => 
    action$.pipe(
        filter(isActionOf(saveBookmarks.request)),
        filter(action => state.value.bookmarksTreeState.filePath != null),
        switchMap(action =>
            from(saveBookmarksFile(state.value.bookmarksTreeState.bookmarksTree, state.value.bookmarksTreeState.filePath)).pipe(
                map(saveBookmarks.success),
                catchError(err => of(saveBookmarks.failure(err)))
            )
        )
    );

export default [
    loadBookmarksEpic, saveBookmarksEpic
];